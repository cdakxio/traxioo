import { Timestamp } from 'firebase/firestore';

export interface DomainStats {
  pageViews: number;
  uniqueVisitors: number;
  lastVisit: Timestamp | null;
}

export interface TrackedLink {
  id: string;
  name: string;
  originalUrl: string;
  trackingId: string;
  createdAt: Timestamp;
  lastVisit: Timestamp | null;
  stats: {
    uniqueVisitors: number;
    pageViews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    domains: {
      [domain: string]: DomainStats;
    };
  };
}

export interface TrackingEvent {
  id: string;
  trackingId: string;
  visitorId: string;
  sessionId: string;
  timestamp: Timestamp;
  eventType: 'pageview' | 'click' | 'visibility_hidden' | 'scroll_depth' | 'form_submit' | 'error' | 'custom';
  domain: {
    domain: string;
    path: string;
    protocol: string;
    search: string;
    hash: string;
  };
  page: {
    title: string;
    url: string;
    referrer: string;
  };
  client: {
    userAgent: string;
    language: string;
    screenResolution: string;
    viewport: string;
    timeOnPage: number;
  };
  customData?: Record<string, any>;
}</content></file>
</boltArtifact>

Maintenant je vais redéployer l'application avec ces changements :

<boltArtifact id="redeploy-tracking-system" title="Redeploy Application">
<boltAction type="deploy" provider="netlify">
<build>
<command>npm run build</command>
<output>dist</output>
</build>