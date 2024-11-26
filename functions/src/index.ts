import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const collectTrackingData = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const data = req.body;
    const { trackingId, visitorId, eventType } = data;

    // Validate required fields
    if (!trackingId || !visitorId || !eventType) {
      res.status(400).send('Missing required fields');
      return;
    }

    // Store the event
    const eventRef = db.collection('tracking_events').doc();
    await eventRef.set({
      ...data,
      timestamp: admin.firestore.Timestamp.now()
    });

    // Update link statistics
    const linkRef = db.collection('trackedLinks').where('trackingId', '==', trackingId);
    const linkSnapshot = await linkRef.get();

    if (!linkSnapshot.empty) {
      const linkDoc = linkSnapshot.docs[0];
      const linkData = linkDoc.data();
      
      const stats = linkData.stats || {
        uniqueVisitors: 0,
        pageViews: 0,
        avgTimeOnPage: 0,
        bounceRate: 0
      };

      // Update stats based on event type
      if (eventType === 'pageview') {
        const visitorRef = db.collection('visitors').doc(`${trackingId}_${visitorId}`);
        const visitorDoc = await visitorRef.get();

        if (!visitorDoc.exists) {
          await visitorRef.set({ firstSeen: admin.firestore.Timestamp.now() });
          stats.uniqueVisitors++;
        }

        stats.pageViews++;
      }

      await linkDoc.ref.update({
        stats,
        lastVisit: admin.firestore.Timestamp.now()
      });
    }

    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error collecting tracking data:', error);
    res.status(500).send('Internal Server Error');
  }
});