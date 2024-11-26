import { Bell, Settings } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-dark-900/50 backdrop-blur-lg border-b border-dark-800/50 z-50">
      <div className="flex items-center justify-between h-full px-8">
        <h1 className="text-xl font-bold gradient-text">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}