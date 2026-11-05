import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown, Sun, Moon } from 'lucide-react';

const Navbar = ({
  activeView = 'home',
  setActiveView = () => {},
  currentUserRole = null,
  currentUser = null,
  onLogout = () => {},
  darkMode = false,
  toggleDarkMode = () => {},
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (view) => {
    if (typeof setActiveView === 'function') {
      setActiveView(view);
    }
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  // Base navigation items
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'marketplace', label: 'Projects' },
  ];

  // If logged in, add Dashboard to the nav list
  if (currentUserRole) {
    navItems.push({ id: currentUserRole === 'student' ? 'studentDashboard' : 'businessDashboard', label: 'Dashboard' });
  }

  // Derive initials for avatar fallback
  const getInitials = () => {
    if (currentUser?.initials) return currentUser.initials;
    if (currentUser?.name) {
      const parts = currentUser.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return currentUser.name.slice(0, 2).toUpperCase();
    }
    if (currentUserRole) {
      return currentUserRole.slice(0, 2).toUpperCase();
    }
    return 'TT';
  };

  // Format role string for badge display
  const formattedRole = currentUserRole
    ? currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1).toLowerCase()
    : '';

  const isStudent = currentUserRole?.toLowerCase() === 'student';

  // Dark mode toggle button component
  const DarkModeToggle = ({ className = '' }) => (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-xl transition-all duration-300 ${
        darkMode
          ? 'bg-dark-card hover:bg-dark-hover text-amber-400 border border-dark-border'
          : 'bg-gray-100/70 hover:bg-gray-200/80 text-gray-600 border border-transparent'
      } ${className}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none transition-transform active:scale-95"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('landing')}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3D] dark:bg-blue flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:bg-[#3B82F6] dark:group-hover:bg-blue-dark transition-colors duration-300">
              TT
            </div>
            <div className="flex items-baseline text-xl tracking-tight">
              <span className="text-[#0B1B3D] dark:text-white font-black">TEAM</span>
              <span className="text-[#3B82F6] font-black ml-1">Talent</span>
            </div>
          </div>

          {/* Desktop Navigation Links with animated hover underline */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-200 group ${
                    isActive ? 'text-[#3B82F6]' : 'text-[#0B1B3D]/75 dark:text-gray-400 hover:text-[#0B1B3D] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Hover and Active Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#3B82F6] rounded-full transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Side: Auth buttons or User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {currentUserRole ? (
              <div className="flex items-center gap-3" ref={userMenuRef}>
                {/* Role Badge (Student / Business) */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                    isStudent
                      ? 'bg-blue-50 dark:bg-blue/10 text-[#3B82F6] border-blue-200/70 dark:border-blue/30'
                      : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200/70 dark:border-indigo-500/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isStudent ? 'bg-[#3B82F6]' : 'bg-indigo-600 dark:bg-indigo-400'
                    }`}
                  />
                  <span>{formattedRole}</span>
                </div>

                {/* Avatar Button / Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-gray-100/80 dark:hover:bg-dark-hover border border-gray-200/70 dark:border-dark-border bg-white dark:bg-dark-card transition-all duration-200 shadow-sm hover:shadow"
                    aria-label="User profile menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0B1B3D] dark:bg-blue text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#3B82F6]/20 overflow-hidden">
                      {currentUser?.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name || 'User avatar'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{getInitials()}</span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#0B1B3D] dark:text-gray-200 max-w-[120px] truncate">
                      {currentUser?.name || formattedRole}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        isUserMenuOpen ? 'rotate-180 text-[#3B82F6]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border py-2 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border">
                        <p className="text-xs font-medium text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-[#0B1B3D] dark:text-white truncate mt-0.5">
                          {currentUser?.name || (isStudent ? 'Student Account' : 'Business Account')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {currentUser?.university || currentUser?.industry || (isStudent ? 'Student Member' : 'Business Client')}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick(currentUserRole === 'student' ? 'studentDashboard' : 'businessDashboard')}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#0B1B3D] dark:text-gray-300 hover:bg-blue-50/70 dark:hover:bg-blue/10 hover:text-[#3B82F6] transition-colors text-left"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <span>View Dashboard</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-gray-100 dark:border-dark-border">
                        <button
                          onClick={() => { setIsUserMenuOpen(false); onLogout(); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Non-authenticated Auth Buttons */
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="px-4 py-2 text-sm font-semibold text-[#0B1B3D] dark:text-gray-300 hover:text-[#3B82F6] rounded-xl hover:bg-gray-100/70 dark:hover:bg-dark-hover border border-transparent transition-all duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3B82F6] hover:bg-blue-600 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Dark Mode Toggle */}
            <DarkModeToggle />

            {currentUserRole && (
              <div
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  isStudent
                    ? 'bg-blue-50 dark:bg-blue/10 text-[#3B82F6] border-blue-200 dark:border-blue/30'
                    : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
                }`}
              >
                {formattedRole}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B1B3D] dark:text-gray-300 hover:text-[#3B82F6] hover:bg-gray-100/80 dark:hover:bg-dark-hover transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-200" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay / Smooth Slide Down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 dark:bg-dark-surface/95 backdrop-blur-lg border-t border-gray-100 dark:border-dark-border ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-4 shadow-lg' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          {/* Mobile Logged-in User Info */}
          {currentUserRole && (
            <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
              <div className="w-10 h-10 rounded-full bg-[#0B1B3D] dark:bg-blue text-white flex items-center justify-center text-sm font-bold ring-2 ring-[#3B82F6]/20 overflow-hidden flex-shrink-0">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || 'User avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#0B1B3D] dark:text-white truncate">
                    {currentUser?.name || (isStudent ? 'Student Account' : 'Business Account')}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isStudent ? 'bg-blue-100 dark:bg-blue/20 text-blue-700 dark:text-blue-400' : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400'
                    }`}
                  >
                    {formattedRole}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {currentUser?.university || currentUser?.industry || 'Signed in'}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links (Stacked) */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue/10 text-[#3B82F6] font-bold'
                      : 'text-[#0B1B3D] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover hover:text-[#3B82F6]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Auth Buttons or Sign Out */}
          <div className="pt-2 border-t border-gray-100 dark:border-dark-border flex flex-col gap-2.5">
            {currentUserRole ? (
              <button
                onClick={() => { setIsMobileMenuOpen(false); onLogout(); }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50/70 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#0B1B3D] dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#3B82F6] hover:bg-blue-600 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
