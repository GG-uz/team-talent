import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import Onboarding from './views/Onboarding';
import ProjectMarketplace from './views/ProjectMarketplace';
import ProjectDetails from './views/ProjectDetails';
import StudentDashboard from './views/StudentDashboard';
import BusinessDashboard from './views/BusinessDashboard';
import ChatWorkspace from './views/ChatWorkspace';

function App() {
  const [activeView, setActiveView] = useState('landing');
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('teamtalent-darkmode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('teamtalent-darkmode', String(darkMode));
  }, [darkMode]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const currentUser = currentUserRole === 'student'
    ? { id: 's1', name: 'Aziza Karimova', initials: 'AK' }
    : currentUserRole === 'business'
    ? { id: 'b1', name: 'TechNova Solutions', initials: 'TN' }
    : null;

  const handleLogout = () => {
    setCurrentUserRole(null);
    setActiveView('landing');
    setSelectedProject(null);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const renderView = () => {
    switch (activeView) {
      case 'landing':
        return <LandingPage setActiveView={setActiveView} />;
      case 'onboarding':
        return (
          <Onboarding
            setCurrentUserRole={setCurrentUserRole}
            setActiveView={setActiveView}
          />
        );
      case 'marketplace':
        return (
          <ProjectMarketplace
            setActiveView={setActiveView}
            setSelectedProject={setSelectedProject}
          />
        );
      case 'projectDetails':
        return (
          <ProjectDetails
            project={selectedProject}
            setActiveView={setActiveView}
            currentUserRole={currentUserRole}
          />
        );
      case 'studentDashboard':
        return (
          <StudentDashboard
            setActiveView={setActiveView}
            setSelectedProject={setSelectedProject}
            currentUser={currentUser}
          />
        );
      case 'businessDashboard':
        return (
          <BusinessDashboard
            setActiveView={setActiveView}
            setSelectedProject={setSelectedProject}
            currentUser={currentUser}
          />
        );
      case 'chat':
        return (
          <ChatWorkspace
            currentUserRole={currentUserRole}
            setActiveView={setActiveView}
          />
        );
      default:
        return <LandingPage setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg grid-pattern">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentUserRole={currentUserRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
