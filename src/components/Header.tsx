import { useState } from 'react';
import { Menu, X, Bot, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const solutions = [
    {
      name: "Génération de leads",
      description: "Identifiez vos prospects idéaux",
      path: "/lead-generation",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Vérification réputation",
      description: "Analysez la présence en ligne",
      path: "/reputation",
      color: "from-indigo-500 to-blue-500"
    },
    {
      name: "Statistiques temps réel",
      description: "Suivez vos performances",
      path: "/analytics",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <header className="fixed w-full z-50">
      {/* Animated gradient line at the top */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
      
      {/* Animated background with glass effect */}
      <div className="absolute inset-0 header-background header-glow">
        <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-md border-b border-dark-800/50"></div>
      </div>
      
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              <Bot className="h-8 w-8 text-purple-500 relative" />
            </div>
            <span className="text-xl font-bold gradient-text">Experio.ia</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors py-2">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="glass-card p-4 shadow-xl shadow-purple-500/10">
                  {solutions.map((solution, index) => (
                    <Link
                      key={index}
                      to={solution.path}
                      className="block p-3 rounded-lg hover:bg-dark-800/50 transition-colors group/item"
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${solution.color} flex items-center justify-center mb-2 transform group-hover/item:scale-110 transition-transform`}>
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-gray-200 font-medium">{solution.name}</h3>
                          <p className="text-sm text-gray-400">{solution.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links with Hover Effects */}
            <Link 
              to="/pricing" 
              className="relative group px-4 py-2"
            >
              <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">Tarifs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>

            <Link 
              to="/contact" 
              className="relative group px-4 py-2"
            >
              <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>

            <Link 
              to="/faq" 
              className="relative group px-4 py-2"
            >
              <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">FAQ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>

            {/* Auth Button */}
            <Link 
              to="/login" 
              className="px-6 py-2 text-white rounded-lg relative group overflow-hidden"
            >
              <span className="relative z-10">Connexion</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass-card p-4 space-y-4 transform transition-all duration-300">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                to={solution.path}
                className="block py-2 text-gray-300 hover:text-purple-400"
              >
                {solution.name}
              </Link>
            ))}
            <Link to="/pricing" className="block py-2 text-gray-300 hover:text-purple-400">Tarifs</Link>
            <Link to="/contact" className="block py-2 text-gray-300 hover:text-purple-400">Contact</Link>
            <Link to="/faq" className="block py-2 text-gray-300 hover:text-purple-400">FAQ</Link>
            <div className="pt-4">
              <Link 
                to="/login" 
                className="block py-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-center hover:from-purple-500 hover:to-indigo-500"
              >
                Connexion
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}