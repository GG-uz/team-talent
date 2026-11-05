import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  CreditCard,
  Star,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Plus,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Eye,
  X,
  Sparkles,
  DollarSign,
  Calendar,
  AlertCircle,
  Award,
  ExternalLink,
} from 'lucide-react';
import {
  mockBusinesses,
  mockProjects,
  mockStudents,
  formatCurrency,
} from '../data/mockData';

const BusinessDashboard = ({
  setActiveView = () => {},
  setSelectedProject = () => {},
  currentUser,
}) => {
  // Use mockBusinesses[0] as primary business profile
  const business = mockBusinesses[0];

  // Projects filtered for current business ('b1')
  const initialProjects = mockProjects.filter((p) => p.businessId === 'b1');
  const [projects, setProjects] = useState(initialProjects);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Modal states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Post project form state
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'IT & Development',
    budget: '',
    duration: '2-4 weeks',
    skills: '',
    description: '',
  });

  // Recent applicants derived from mockStudents
  const applicantsList = [
    {
      ...mockStudents[0],
      appliedFor: 'E-commerce Website Redesign',
      appliedDate: '2 hours ago',
      matchScore: '98% Match',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      ...mockStudents[1],
      appliedFor: 'SEO Audit & Content Strategy',
      appliedDate: 'Yesterday',
      matchScore: '94% Match',
      gradient: 'from-emerald-500 to-teal-700',
    },
    {
      id: 's3',
      name: 'Jasur Rahimov',
      initials: 'JR',
      major: 'UI/UX & Brand Design',
      university: 'Turin Polytechnic University',
      year: '4th Year',
      rating: 4.8,
      reviewCount: 7,
      skills: ['Figma', 'Brand Identity', 'UI/UX', 'Illustrator'],
      completedProjects: 5,
      activeProjects: 1,
      totalEarned: 2800000,
      bio: 'Creative product and visual designer specializing in brand identity systems and modern interfaces.',
      availability: 'Flexible (25hrs/week)',
      appliedFor: 'Brand Identity & Logo Design',
      appliedDate: '2 days ago',
      matchScore: '96% Match',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  // Helper to trigger toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handle post new project submission
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.budget) {
      alert('Please fill in the project title and budget.');
      return;
    }

    const created = {
      id: `p${Date.now()}`,
      title: newProject.title,
      businessId: 'b1',
      businessName: business.name,
      businessInitials: business.initials,
      description: newProject.description || 'Newly posted project on TEAM Talent.',
      budget: parseInt(newProject.budget, 10) || 1500000,
      deadline: '2026-11-30',
      duration: newProject.duration,
      category: newProject.category,
      skills: newProject.skills
        ? newProject.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Creative', 'Teamwork', 'Communication'],
      applicants: 0,
      status: 'open',
      postedDate: '2026-10-17',
      isRemote: true,
      difficulty: 'Intermediate',
    };

    setProjects([created, ...projects]);
    setIsPostModalOpen(false);
    setNewProject({
      title: '',
      category: 'IT & Development',
      budget: '',
      duration: '2-4 weeks',
      skills: '',
      description: '',
    });
    showToast(`Project "${created.title}" was successfully posted!`);
  };

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Projects', icon: Briefcase },
    { name: 'Applicants', icon: Users },
    { name: 'Messages', icon: MessageSquare, action: () => setActiveView('chat') },
    { name: 'Payments', icon: CreditCard },
    { name: 'Settings', icon: Settings },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
      return;
    }
    setActiveTab(item.name);

    if (item.name === 'My Projects') {
      const el = document.getElementById('active-projects-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.name === 'Applicants') {
      const el = document.getElementById('recent-applicants-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock applicant avatar stacks for active projects
  const getMockAvatars = (projectId) => {
    if (projectId === 'p1') {
      return [
        { initials: 'AK', bg: 'bg-indigo-600', name: 'Aziza Karimova' },
        { initials: 'BA', bg: 'bg-emerald-600', name: 'Bobur Alimov' },
        { initials: 'JR', bg: 'bg-purple-600', name: 'Jasur Rahimov' },
      ];
    }
    if (projectId === 'p3') {
      return [
        { initials: 'JR', bg: 'bg-purple-600', name: 'Jasur Rahimov' },
        { initials: 'MU', bg: 'bg-pink-600', name: 'Malika Umarova' },
        { initials: 'DK', bg: 'bg-blue-600', name: 'Dilnoza Karim' },
      ];
    }
    return [
      { initials: 'BA', bg: 'bg-emerald-600', name: 'Bobur Alimov' },
      { initials: 'AK', bg: 'bg-indigo-600', name: 'Aziza Karimova' },
      { initials: 'ST', bg: 'bg-amber-600', name: 'Sardor Tursunov' },
    ];
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-navy dark:text-white transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-navy dark:bg-dark-card text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-navy-light/40 dark:border-dark-border animate-fade-in">
          <div className="w-8 h-8 rounded-xl bg-blue/20 text-blue flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-blue-light" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LEFT SIDEBAR (hidden on mobile, lg:w-80 xl:w-96) */}
      <aside className="hidden lg:flex flex-col lg:w-80 xl:w-96 bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-dark-border p-8 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Company Profile */}
        <div className="flex flex-col items-start">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy to-navy-light dark:from-blue-600 dark:to-navy flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-navy/20">
            {business.initials}
          </div>

          <h2 className="text-xl font-bold text-navy dark:text-white mt-4 tracking-tight">
            {business.name}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light px-3 py-1 rounded-lg text-sm font-semibold tracking-wide">
              {business.industry}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg font-medium border border-emerald-100/60 dark:border-emerald-500/20">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mt-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{business.location}</span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            {business.description}
          </p>
        </div>

        {/* POST A PROJECT BUTTON */}
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="mt-6 w-full bg-blue text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-dark hover:scale-[1.02] shadow-lg shadow-blue/25 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Post a Project</span>
        </button>

        {/* Sidebar Navigation */}
        <nav className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 mb-2">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    isActive
                      ? 'bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-semibold shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-blue dark:text-blue-light' : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.name === 'Messages' && (
                    <span className="w-2 h-2 rounded-full bg-blue ring-4 ring-blue/20" />
                  )}
                  {item.name === 'My Projects' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 font-semibold border dark:border-dark-border">
                      {projects.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Support / Upgrade Card */}
          <div className="mt-8 bg-cream/80 dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-navy dark:text-white font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue" />
              <span>Priority Employer</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Top university applicants reach out 3x faster with priority listings.
            </p>
            <button
              onClick={() => showToast('Priority employer status is currently active!')}
              className="mt-3 text-xs font-semibold text-blue dark:text-blue-light hover:text-blue-dark flex items-center gap-1 group"
            >
              <span>View perks</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Mobile Header (lg:hidden) */}
        <div className="lg:hidden mb-6 bg-white dark:bg-dark-card rounded-2xl p-5 border border-gray-100 dark:border-dark-border shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-sm">
                {business.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-navy dark:text-white leading-snug">
                    {business.name}
                  </h2>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-semibold px-2 py-0.5 rounded">
                    {business.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {business.location}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="p-3 bg-blue text-white rounded-xl shadow-md shadow-blue/20 hover:bg-blue-dark transition-all flex-shrink-0"
              aria-label="Post a Project"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile quick action buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
            <button
              onClick={() => setActiveView('chat')}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-blue" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-blue dark:text-blue-light bg-blue/10 dark:bg-blue/20 hover:bg-blue/15 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4 text-blue" />
              <span>Post Project</span>
            </button>
          </div>
        </div>

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-white leading-none">
              Welcome back, TechNova! 🏢
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-normal">
              Manage your projects and talent pipeline
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('chat')}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover text-navy dark:text-white font-semibold text-sm transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-blue" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue hover:bg-blue-dark text-white font-semibold text-sm transition-all shadow-md shadow-blue/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Post a Project</span>
            </button>
          </div>
        </div>

        {/* STAT BLOCKS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* 1. Total Spent */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total Spent
              </span>
              <div className="w-12 h-12 rounded-xl bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light flex items-center justify-center transition-transform group-hover:scale-110">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white mt-3 tracking-tight">
              {formatCurrency(business.totalSpent)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18% from last month</span>
            </div>
          </div>

          {/* 2. Active Projects */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Active Projects
              </span>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white mt-3 tracking-tight">
              {projects.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>All actively receiving applicants</span>
            </div>
          </div>

          {/* 3. Total Applicants */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total Applicants
              </span>
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-transform group-hover:scale-110">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white mt-3 tracking-tight">
              {business.totalApplicants}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-semibold mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6 new this week</span>
            </div>
          </div>

          {/* 4. Avg. Rating */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Avg. Rating
              </span>
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white mt-3 tracking-tight">
              4.8/5.0
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
              <span>Based on 14 student reviews</span>
            </div>
          </div>
        </div>

        {/* ACTIVE PROJECTS SECTION */}
        <section id="active-projects-section" className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white tracking-tight">
                Your Active Projects
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Monitor candidates, milestones, and project budgets
              </p>
            </div>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue/10 dark:bg-blue/20 hover:bg-blue/15 text-blue dark:text-blue-light font-semibold rounded-xl text-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Post New</span>
            </button>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project) => {
              const avatars = getMockAvatars(project.id);
              const remainingApplicants = Math.max(0, (project.applicants || 0) - avatars.length);

              return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-7 border border-gray-100 dark:border-dark-border hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-700 transition-all"
                >
                  {/* Header Row: Title + Status Badge + Budget */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveView('projectDetails');
                        }}
                        className="font-bold text-lg text-navy dark:text-white hover:text-blue dark:hover:text-blue-light transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Open
                      </span>
                    </div>

                    <div className="text-lg sm:text-xl font-black text-navy dark:text-white sm:text-right">
                      {formatCurrency(project.budget)}
                    </div>
                  </div>

                  {/* Meta Row: Deadline, Duration, Category */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-gray-500 dark:text-gray-400 mt-3 pt-2">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Deadline: {project.deadline}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>Duration: {project.duration}</span>
                    </div>

                    <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-gray-300">
                      {project.category}
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {project.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-gray-50 dark:bg-dark-hover text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 font-medium border border-gray-100 dark:border-dark-border hover:bg-gray-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Applicants Progress & Actions Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-100 dark:border-dark-border">
                    <div className="flex items-center gap-4">
                      {/* Overlapping Candidate Avatars */}
                      <div className="flex items-center -space-x-2.5">
                        {avatars.map((av, idx) => (
                          <div
                            key={idx}
                            title={av.name}
                            className={`w-9 h-9 rounded-full ${av.bg} text-white font-bold text-xs flex items-center justify-center border-2 border-white dark:border-dark-card shadow-xs cursor-pointer hover:scale-110 transition-transform z-${10 - idx}`}
                          >
                            {av.initials}
                          </div>
                        ))}
                        {remainingApplicants > 0 && (
                          <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-300 font-bold text-xs flex items-center justify-center border-2 border-white dark:border-dark-card shadow-xs">
                            +{remainingApplicants}
                          </div>
                        )}
                      </div>

                      {/* Applicant Count with progress bar feel */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-navy dark:text-white">
                            {project.applicants} Applicants
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            • High interest
                          </span>
                        </div>
                        <div className="w-32 sm:w-44 h-1.5 bg-gray-100 dark:bg-dark-hover rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="h-full bg-blue rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, Math.max(25, (project.applicants || 1) * 8))}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveView('projectDetails');
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-hover rounded-xl transition-all"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveView('chat');
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue text-white rounded-xl text-xs font-semibold hover:bg-blue-dark transition-all shadow-sm shadow-blue/20 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Review Applicants</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RECENT APPLICANTS SECTION */}
        <section id="recent-applicants-section" className="mt-14 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white tracking-tight">
                Recent Applicants
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Top rated university candidates matching your open requirements
              </p>
            </div>

            <button
              onClick={() => setActiveView('chat')}
              className="text-sm font-semibold text-blue dark:text-blue-light hover:text-blue-dark flex items-center gap-1 group"
            >
              <span>View all conversations</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Cards for mockStudents */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {applicantsList.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Avatar & Match Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${applicant.gradient} text-white font-black text-lg flex items-center justify-center shadow-md shadow-navy/10 flex-shrink-0`}
                      >
                        {applicant.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-navy dark:text-white leading-tight hover:text-blue dark:hover:text-blue-light cursor-pointer transition-colors"
                            onClick={() => setSelectedApplicant(applicant)}>
                          {applicant.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {applicant.major}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                          {applicant.university} • {applicant.year}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-blue dark:text-blue-light bg-blue/10 dark:bg-blue/20 px-2 py-0.5 rounded-full flex-shrink-0">
                      {applicant.matchScore}
                    </span>
                  </div>

                  {/* Rating with Star */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-sm text-navy dark:text-white ml-1.5">
                        {applicant.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      ({applicant.reviewCount} reviews • {applicant.completedProjects} jobs)
                    </span>
                  </div>

                  {/* Applied For Tag */}
                  <div className="mt-3 bg-cream/70 dark:bg-dark-surface rounded-xl p-2.5 border border-gray-100 dark:border-dark-border">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Briefcase className="w-3.5 h-3.5 text-blue flex-shrink-0" />
                      <span className="font-medium truncate">
                        Applied for:{' '}
                        <span className="font-bold text-navy dark:text-white">
                          {applicant.appliedFor}
                        </span>
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 pl-5">
                      Applied {applicant.appliedDate}
                    </div>
                  </div>

                  {/* Skills (first 3) */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4">
                    {applicant.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-gray-50 dark:bg-dark-hover text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 font-medium border border-gray-100 dark:border-dark-border"
                      >
                        {skill}
                      </span>
                    ))}
                    {applicant.skills.length > 3 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        +{applicant.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Two Action Buttons: Review & Message */}
                <div className="grid grid-cols-2 gap-2.5 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                  <button
                    onClick={() => setSelectedApplicant(applicant)}
                    className="border border-blue text-blue dark:text-blue-light hover:bg-blue/5 dark:hover:bg-blue/10 rounded-xl font-semibold text-xs py-2.5 px-3 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </button>

                  <button
                    onClick={() => setActiveView('chat')}
                    className="bg-blue hover:bg-blue-dark text-white rounded-xl font-semibold text-xs py-2.5 px-3 transition-all shadow-sm shadow-blue/20 flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* POST A PROJECT MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-navy/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl animate-fade-in-up border border-gray-100 dark:border-dark-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border">
              <div>
                <h3 className="text-2xl font-bold text-navy dark:text-white">Post a New Project</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Reach top talent from leading universities in Uzbekistan
                </p>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-gray-400 hover:text-navy dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Mobile App Landing Page"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({ ...newProject, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium bg-white dark:bg-dark-surface"
                  >
                    <option value="IT & Development">IT & Development</option>
                    <option value="Design">Design & Creative</option>
                    <option value="Marketing">Marketing & Growth</option>
                    <option value="Content">Content & Copywriting</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Budget (UZS)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2000000"
                    value={newProject.budget}
                    onChange={(e) =>
                      setNewProject({ ...newProject, budget: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2-3 weeks"
                    value={newProject.duration}
                    onChange={(e) =>
                      setNewProject({ ...newProject, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Figma, SEO"
                    value={newProject.skills}
                    onChange={(e) =>
                      setNewProject({ ...newProject, skills: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe project deliverables, scope, and candidate expectations..."
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-blue hover:bg-blue-dark rounded-xl shadow-md shadow-blue/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Publish Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICANT REVIEW MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-navy/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-fade-in-up border border-gray-100 dark:border-dark-border">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedApplicant.gradient || 'from-blue to-navy'} text-white font-black text-xl flex items-center justify-center shadow-md`}
                >
                  {selectedApplicant.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">
                    {selectedApplicant.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedApplicant.major} • {selectedApplicant.university}
                  </p>
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedApplicant.rating}</span>
                    <span className="text-gray-400 dark:text-gray-500 font-normal">
                      ({selectedApplicant.reviewCount} client reviews)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-gray-400 hover:text-navy dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  About
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedApplicant.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-cream/80 dark:bg-dark-surface p-3.5 rounded-xl border border-gray-100 dark:border-dark-border text-xs">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block font-medium">Availability</span>
                  <span className="font-semibold text-navy dark:text-white mt-0.5 block">
                    {selectedApplicant.availability}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block font-medium">Completed Jobs</span>
                  <span className="font-semibold text-navy dark:text-white mt-0.5 block">
                    {selectedApplicant.completedProjects} Projects completed
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApplicant.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-semibold text-xs px-2.5 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100/60 dark:border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>
                  Applied for <strong>{selectedApplicant.appliedFor}</strong>.
                  Candidate portfolio and verified credentials match requirement.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedApplicant(null);
                  setActiveView('chat');
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue hover:bg-blue-dark rounded-xl shadow-md shadow-blue/20 transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Conversation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
