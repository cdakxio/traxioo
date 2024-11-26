// Traxioo Tracking Script
(function() {
  const TRACKING_ENDPOINT = 'https://mellow-concha-3e3673.netlify.app/collect';
  let trackingId = null;
  let sessionId = null;
  let visitorId = null;
  let startTime = null;

  // Generate or retrieve visitor ID
  function getVisitorId() {
    let id = localStorage.getItem('trx_vid');
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('trx_vid', id);
    }
    return id;
  }

  // Generate session ID
  function generateSessionId() {
    return 's_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Get domain info
  function getDomainInfo() {
    return {
      domain: window.location.hostname,
      path: window.location.pathname,
      protocol: window.location.protocol,
      search: window.location.search,
      hash: window.location.hash
    };
  }

  // Send data to collection endpoint
  function sendData(eventType, eventData = {}) {
    if (!trackingId) return;

    const data = {
      trackingId,
      visitorId,
      sessionId,
      timestamp: new Date().toISOString(),
      eventType,
      domain: getDomainInfo(),
      page: {
        title: document.title,
        url: window.location.href,
        referrer: document.referrer
      },
      client: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timeOnPage: startTime ? Math.round((performance.now() - startTime) / 1000) : 0
      },
      ...eventData
    };

    // Use Beacon API if available, fallback to fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify(data));
    } else {
      fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        keepalive: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(() => {}); // Silently handle errors
    }
  }

  // Track scroll depth
  function trackScrollDepth() {
    let maxScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = Math.round((window.scrollY / scrollHeight) * 100);
          
          if (currentScroll > maxScroll) {
            maxScroll = currentScroll;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
              sendData('scroll_depth', { depth: maxScroll });
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Initialize tracking
  function init(id) {
    trackingId = id;
    visitorId = getVisitorId();
    sessionId = generateSessionId();
    startTime = performance.now();
    
    // Track initial pageview
    sendData('pageview');

    // Track scroll depth
    trackScrollDepth();
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendData('visibility_hidden', {
          timeSpent: Math.round((performance.now() - startTime) / 1000)
        });
      }
    });

    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        sendData('click', {
          element: target.tagName.toLowerCase(),
          text: target.textContent?.trim(),
          href: target.href,
          id: target.id,
          classes: target.className
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      sendData('form_submit', {
        formId: form.id,
        formAction: form.action,
        formMethod: form.method
      });
    });

    // Track errors
    window.addEventListener('error', (e) => {
      sendData('error', {
        message: e.message,
        filename: e.filename,
        lineNumber: e.lineno,
        columnNumber: e.colno
      });
    });
  }

  // Handle commands
  window.TrxTracker = function() {
    const args = Array.from(arguments);
    const command = args[0];

    switch (command) {
      case 'init':
        init(args[1]);
        break;
      case 'pageview':
        sendData('pageview');
        break;
      case 'event':
        sendData('custom', {
          name: args[1],
          data: args[2]
        });
        break;
    }
  };

  // Process queued commands
  const queue = window.TrxTracker.q || [];
  queue.forEach(args => window.TrxTracker.apply(null, args));
})();