import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qu'est-ce qu'Experio.ia ?",
      answer: "Experio.ia est une plateforme complète de génération de leads et d'intelligence commerciale propulsée par l'IA. Notre solution permet aux entreprises d'optimiser leur prospection grâce à des outils automatisés de génération de leads, d'analyse de réputation et de suivi en temps réel."
    },
    {
      question: "Comment fonctionne l'offre annuelle ?",
      answer: "En souscrivant à un abonnement annuel, vous bénéficiez d'un mois gratuit. Cela signifie que vous ne payez que 11 mois pour une utilisation de 12 mois, représentant une économie significative par rapport à l'abonnement mensuel."
    },
    {
      question: "Puis-je changer de forfait à tout moment ?",
      answer: "Oui, vous pouvez changer de forfait à tout moment. Le changement prendra effet à la prochaine période de facturation. Si vous passez à un forfait supérieur, vous aurez immédiatement accès aux nouvelles fonctionnalités."
    },
    {
      question: "Comment sont générés les leads ?",
      answer: "Notre IA analyse de multiples sources de données pour identifier les prospects les plus pertinents pour votre activité. Nous utilisons des algorithmes avancés pour évaluer la compatibilité des leads avec vos critères et leur potentiel de conversion."
    },
    {
      question: "Les données sont-elles sécurisées ?",
      answer: "Absolument. Nous appliquons les plus hauts standards de sécurité pour protéger vos données. Toutes les informations sont chiffrées et nous sommes en conformité avec le RGPD et les réglementations en vigueur."
    },
    {
      question: "Quel est le délai de mise en place ?",
      answer: "La mise en place est immédiate. Dès la création de votre compte, vous pouvez commencer à utiliser la plateforme. Notre système d'IA commence à apprendre de vos préférences dès les premières utilisations pour des résultats optimaux."
    }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text text-center mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12">
            Tout ce que vous devez savoir sur Experio.ia
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-100">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-500" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Vous ne trouvez pas la réponse que vous cherchez ?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}