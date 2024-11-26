import { useEffect, useState } from 'react';
import { BarChart3, Users, TrendingUp, Award } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface StatCardProps {
  icon: typeof BarChart3;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="glass-card p-6 hover:shadow-[0_0_30px_6px_rgba(139,92,246,0.1)] transition-all duration-500">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${
              trendUp ? 'text-green-500' : 'text-red-500'
            }`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${!trendUp && 'rotate-180'}`} />
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg">
          <Icon className="h-6 w-6 text-purple-400" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Nouveaux prospects',
      value: '127',
      trend: '+12.5% ce mois',
      trendUp: true
    },
    {
      icon: BarChart3,
      label: 'Taux de conversion',
      value: '3.2%',
      trend: '+0.8% ce mois',
      trendUp: true
    },
    {
      icon: Award,
      label: 'Score de qualité',
      value: '92/100',
      trend: '-2 points ce mois',
      trendUp: false
    }
  ];

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
          <h2 className="text-2xl font-bold text-white mb-6">Vue d'ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Activité récente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="p-4 bg-dark-800/50 rounded-lg flex items-center justify-between hover:bg-dark-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-200">Nouveau prospect identifié</p>
                    <p className="text-sm text-gray-400">Il y a 2 heures</p>
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  Voir les détails
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}