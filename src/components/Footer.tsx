import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50 bg-dark-900/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold gradient-text">Experio.ia</span>
            </div>
            <p className="text-gray-400">
              Votre partenaire en intelligence artificielle pour une prospection efficace.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/lead-generation" className="text-gray-400 hover:text-purple-400 transition-colors">Génération de leads</Link></li>
              <li><Link to="/reputation" className="text-gray-400 hover:text-purple-400 transition-colors">Vérification réputation</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-purple-400 transition-colors">Statistiques en temps réel</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-purple-400 transition-colors">Rapports personnalisés</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">CGV</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-purple-400 transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-dark-800/50">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Experio.ia. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}