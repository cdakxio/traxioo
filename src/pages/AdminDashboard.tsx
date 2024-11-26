import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link, Link2, Copy, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import toast from 'react-hot-toast';
import type { TrackedLink } from '../types/tracking';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [trackedLinks, setTrackedLinks] = useState<TrackedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'trackedLinks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const links = snapshot.docs.map(doc => {
        const data = doc.data();
        const stats = data.stats || {
          uniqueVisitors: 0,
          pageViews: 0,
          avgTimeOnPage: 0,
          bounceRate: 0
        };
        return {
          id: doc.id,
          ...data,
          stats
        } as TrackedLink;
      });
      setTrackedLinks(links);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const trackingId = `TRX-${nanoid(10)}`;
      const newLink: Omit<TrackedLink, 'id'> = {
        name: newLinkName,
        originalUrl: newLinkUrl,
        trackingId,
        createdAt: Timestamp.now(),
        lastVisit: null,
        stats: {
          uniqueVisitors: 0,
          pageViews: 0,
          avgTimeOnPage: 0,
          bounceRate: 0
        }
      };

      await addDoc(collection(db, 'trackedLinks'), newLink);
      
      setNewLinkUrl('');
      setNewLinkName('');
      toast.success('Lien de tracking créé avec succès');
    } catch (error) {
      console.error('Error creating tracking link:', error);
      toast.error('Erreur lors de la création du lien');
    }
  };

  const getTrackingScript = (trackingId: string) => {
    return `
<!-- Traxioo Tracking Code -->
<script>
(function(w,d,t,id) {
  w.TrxTracker = w.TrxTracker || function() {
    (w.TrxTracker.q = w.TrxTracker.q || []).push(arguments);
  };
  var s = d.createElement('script');
  s.async = true;
  s.src = 'https://mellow-concha-3e3673.netlify.app/tracker.js';
  s.id = 'trx-tracker-' + id;
  var x = d.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
})(window,document,'script','${trackingId}');

TrxTracker('init', '${trackingId}');
TrxTracker('pageview');
</script>
<!-- End Traxioo Tracking Code -->`;
  };

  const copyTrackingScript = (trackingId: string) => {
    navigator.clipboard.writeText(getTrackingScript(trackingId));
    setCopiedId(trackingId);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Code de tracking copié');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Gestion des liens trackés</h2>
          
          <form onSubmit={handleCreateLink} className="glass-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="linkName" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du lien
                </label>
                <input
                  type="text"
                  id="linkName"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Page d'accueil"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-300 mb-2">
                  URL à tracker
                </label>
                <input
                  type="url"
                  id="linkUrl"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Link className="h-5 w-5" />
              <span>Créer un nouveau lien tracké</span>
            </button>
          </form>

          <div className="space-y-4">
            {trackedLinks.map((link) => (
              <div key={link.id} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{link.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-400 mb-4">
                      <Link2 className="h-4 w-4" />
                      <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
                        {link.originalUrl}
                      </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Visiteurs uniques</p>
                        <p className="text-xl font-bold text-white">{link.stats.uniqueVisitors}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Pages vues</p>
                        <p className="text-xl font-bold text-white">{link.stats.pageViews}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Temps moyen</p>
                        <p className="text-xl font-bold text-white">{link.stats.avgTimeOnPage}s</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Taux de rebond</p>
                        <p className="text-xl font-bold text-white">{link.stats.bounceRate}%</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyTrackingScript(link.trackingId)}
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                  >
                    {copiedId === link.trackingId ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">Copié!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">Copier le code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}