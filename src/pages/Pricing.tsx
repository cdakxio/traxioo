import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: "Essentiel",
      price: { monthly: "29", annual: "290" },
      description: "Parfait pour démarrer votre prospection intelligente",
      features: [
        "100 leads par mois",
        "Vérification de réputation basique",
        "Statistiques essentielles",
        "1 rapport personnalisé par mois",
        "Support par email"
      ]
    },
    {
      name: "Pro",
      price: { monthly: "49", annual: "490" },
      description: "Pour les professionnels qui veulent aller plus loin",
      features: [
        "500 leads par mois",
        "Vérification de réputation avancée",
        "Statistiques en temps réel",
        "5 rapports personnalisés par mois",
        "Support prioritaire",
        "Conseils IA personnalisés",
        "Export des données"
      ]
    },
    {
      name: "Enterprise",
      price: { monthly: "89", annual: "890" },
      description: "Solution complète pour les équipes ambitieuses",
      features: [
        "Leads illimités",
        "Vérification de réputation premium",
        "Statistiques avancées et prédictives",
        "Rapports illimités",
        "Support dédié 24/7",
        "API complète",
        "Formation personnalisée",
        "Intégrations sur mesure"
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-dark-950">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Choisissez le plan adapté à vos besoins
          </h1>
          <p className="text-xl text-gray-400">
            1 mois offert pour tout abonnement annuel
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`glass-card overflow-hidden ${
              plan.name === "Pro" ? "border-2 border-purple-500 transform md:-translate-y-4" : ""
            }`}>
              {plan.name === "Pro" && (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2">
                  <span className="text-sm font-medium">PLUS POPULAIRE</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="space-y-4 mb-6">
                  {/* Monthly Price */}
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-100">{plan.price.monthly}€</span>
                      <span className="text-gray-400 ml-2">/mois</span>
                    </div>
                    <p className="text-sm text-gray-500">Facturation mensuelle</p>
                  </div>

                  {/* Annual Price */}
                  <div className="p-4 rounded-lg bg-dark-900/50 border border-purple-500/20">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-100">{plan.price.annual}€</span>
                      <span className="text-gray-400 ml-2">/an</span>
                    </div>
                    <p className="text-sm text-purple-400">1 mois offert</p>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/register"
                  className={`block w-full text-center py-3 rounded-lg transition-all ${
                    plan.name === "Pro"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500"
                      : "border border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  }`}
                >
                  Souscrire maintenant
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text text-center mb-8">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Comment fonctionne l'offre annuelle ?
              </h3>
              <p className="text-gray-400">
                En choisissant un abonnement annuel, vous bénéficiez d'un mois gratuit, soit l'équivalent de 11 mois payés pour 12 mois d'utilisation.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-gray-400">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements seront effectifs à votre prochaine période de facturation.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Y a-t-il un engagement minimum ?
              </h3>
              <p className="text-gray-400">
                Pour les abonnements mensuels, l'engagement est d'un mois. Pour les abonnements annuels, l'engagement est d'un an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}