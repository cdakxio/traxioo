import { Link, useLocation } from 'react-router-dom';
import { Bot, BarChart3, Users, Settings, FileText, HelpCircle, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function DashboardSidebar() {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  const menuItems = [
    { icon: BarChart3, label: 'Vue d\'ensemble', path: '/dashboard' },
    { icon: Users, label: 'Prospects', path: '/dashboard/prospects' },
    { icon: FileText, label: 'Rapports', path: '/dashboard/reports' },
    { icon: Settings, label: 'Paramètres', path: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Aide', path: '/dashboard/help' },
    ...(isAdmin ? [{ icon: Shield, label: 'Administration', path: '/dashboard/admin' }] : []),
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900 border-r border-dark-800/50">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold gradient-text">Experio.ia</span>
        </Link>
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 text-gray-400 hover:text-white relative group ${
                isActive ? 'text-white' : ''
              }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>
              )}
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20' 
                  : 'group-hover:bg-dark-800/50'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}