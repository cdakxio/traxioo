import { Handler } from '@netlify/functions';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is required');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

export const handler: Handler = async (event) => {
  // Enable CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { trackingId, visitorId, eventType, domain } = data;

    // Validate required fields
    if (!trackingId || !visitorId || !eventType || !domain) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Store the event
    const eventRef = db.collection('tracking_events').doc();
    await eventRef.set({
      ...data,
      timestamp: new Date()
    });

    // Update link statistics
    const linkSnapshot = await db.collection('trackedLinks')
      .where('trackingId', '==', trackingId)
      .get();

    if (!linkSnapshot.empty) {
      const linkDoc = linkSnapshot.docs[0];
      const linkData = linkDoc.data();
      
      const stats = linkData.stats || {
        uniqueVisitors: 0,
        pageViews: 0,
        avgTimeOnPage: 0,
        bounceRate: 0,
        domains: {}
      };

      // Update domain-specific stats
      const domainKey = domain.domain;
      if (!stats.domains[domainKey]) {
        stats.domains[domainKey] = {
          pageViews: 0,
          uniqueVisitors: 0,
          lastVisit: null
        };
      }

      // Update stats based on event type
      if (eventType === 'pageview') {
        const visitorRef = db.collection('visitors').doc(`${trackingId}_${visitorId}_${domainKey}`);
        const visitorDoc = await visitorRef.get();

        if (!visitorDoc.exists) {
          await visitorRef.set({ 
            firstSeen: new Date(),
            domain: domainKey
          });
          stats.uniqueVisitors++;
          stats.domains[domainKey].uniqueVisitors++;
        }

        stats.pageViews++;
        stats.domains[domainKey].pageViews++;
        stats.domains[domainKey].lastVisit = new Date();
      }

      // Update time on page if available
      if (data.client?.timeOnPage) {
        const totalTime = (stats.avgTimeOnPage * (stats.pageViews - 1) + data.client.timeOnPage) / stats.pageViews;
        stats.avgTimeOnPage = Math.round(totalTime);
      }

      await linkDoc.ref.update({
        stats,
        lastVisit: new Date()
      });
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error collecting tracking data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};