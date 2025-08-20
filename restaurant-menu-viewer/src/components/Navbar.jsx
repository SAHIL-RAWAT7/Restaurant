import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiLogOut, FiLogIn } from 'react-icons/fi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed bg-white shadow-md py-2 top-0' : 'relative bg-white py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo with Spoon Icon */}
          <Link to="/" className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-amber-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M6 2a1 1 0 011-1h.5a.5.5 0 01.5.5V4h8V1.5a.5.5 0 01.5-.5h.5a1 1 0 011 1v16a1 1 0 01-1 1h-2.5a1 1 0 01-1-1V16H9v1.5a1 1 0 01-1 1H6a1 1 0 01-1-1V2zm6 13V5H7v10h5z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className={`ml-2 text-lg font-light tracking-wider ${isScrolled ? 'text-gray-800' : 'text-gray-700'}`}>
              Savory
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-500'}`}
            >
              Menu
            </Link>

            {isAuthenticated && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors ${location.pathname === '/admin' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-500'}`}
              >
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors flex items-center"
              >
                Logout
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors flex items-center"
              >
                Login
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="bg-white border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-amber-100 text-amber-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Menu
            </Link>

            {isAuthenticated && (
              <Link
                to="/admin"
                className={`block px-4 py-2 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-amber-100 text-amber-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center"
              >
                <FiLogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}