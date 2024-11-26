import { ArrowRight, Bot, BarChart3, Users, Shield, Brain, LineChart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Génération de leads",
      description: "Identifiez automatiquement les prospects les plus pertinents pour votre activité."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Vérification réputation",
      description: "Analysez instantanément la présence en ligne et la réputation de vos prospects."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Statistiques temps réel",
      description: "Suivez vos performances et optimisez votre stratégie en temps réel."
    }
  ];

  const stats = [
    { value: "93%", label: "Taux de satisfaction" },
    { value: "2.5x", label: "Conversion moyenne" },
    { value: "45min", label: "Temps gagné/jour" }
  ];

  return (
    <div className="bg-dark-950">
      {/* Hero Section with Parallax */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <div ref={parallaxRef} className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
          <div className="absolute inset-0 bg-hero-pattern opacity-5 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text leading-tight animate-fade-in">
                Révolutionnez votre prospection
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                Experio.ia transforme votre approche commerciale avec l'IA
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_8px_rgba(139,92,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative text-white flex items-center justify-center">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/demo" 
                  className="group px-8 py-4 glass-card rounded-xl transition-all duration-500 hover:shadow-[0_0_20px_4px_rgba(139,92,246,0.1)]"
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors">Voir la démo</span>
                </Link>
              </div>
            </div>

            {/* Floating Screenshots */}
            <div className="relative mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
              <div className="transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80"
                  alt="Dashboard"
                  className="rounded-lg shadow-xl hover:shadow-purple-500/20 transition-shadow duration-500"
                  loading="lazy"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-500 translate-y-4 hover:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
                  alt="Analytics"
                  className="rounded-lg shadow-xl hover:shadow-purple-500/20 transition-shadow duration-500"
                  loading="lazy"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
                  alt="Reports"
                  className="rounded-lg shadow-xl hover:shadow-purple-500/20 transition-shadow duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Hover Effects */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group glass-card p-6 hover:shadow-[0_0_30px_6px_rgba(139,92,246,0.1)] transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Animation */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-105 transition-transform duration-500"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Design */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto gradient-border transform hover:scale-[1.02] transition-transform duration-500">
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à transformer votre prospection ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              1 mois offert pour tout abonnement annuel
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-[0_0_30px_6px_rgba(139,92,246,0.2)] transition-all duration-500 group"
            >
              Démarrer maintenant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}