import React, { useState } from 'react';
import {
  Star,
  Briefcase,
  Wallet,
  CheckCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Clock,
  ArrowRight,
  TrendingUp,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { mockStudents, mockProjects, formatCurrency } from '../data/mockData';

const StudentDashboard = ({ setActiveView, setSelectedProject, currentUser }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const student = mockStudents[0];

  const firstName = student?.name ? student.name.split(' ')[0] : 'Aziza';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'My Projects', icon: Briefcase, targetView: 'marketplace' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, targetView: 'chat' },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (item) => {
    setActiveNav(item.id);
    if (item.targetView && setActiveView) {
      setActiveView(item.targetView);
    }
  };

  const handleProjectClick = (project) => {
    if (setSelectedProject) {
      setSelectedProject(project);
    }
    if (setActiveView) {
      setActiveView('projectDetails');
    }
  };

  const recommendedProjects = mockProjects.slice(0, 3);

  const activities = [
    {
      id: 1,
      title: 'New message from TechNova Solutions',
      description: 'Regarding timeline questions for the E-commerce platform redesign.',
      timeAgo: '1 day ago',
      icon: MessageSquare,
      color: 'blue',
      badge: 'Message',
    },
    {
      id: 2,
      title: 'You applied to E-commerce Website Redesign',
      description: 'Application proposal and portfolio submitted to TechNova Solutions.',
      timeAgo: '2 days ago',
      icon: Briefcase,
      color: 'blue',
      badge: 'Proposal',
    },
    {
      id: 3,
      title: 'Payment received for Social Media Campaign',
      description: `Successfully released milestone payout of ${formatCurrency(1500000)}.`,
      timeAgo: '5 days ago',
      icon: Wallet,
      color: 'emerald',
      badge: 'Payout',
    },
    {
      id: 4,
      title: 'Milestone approved on Brand Identity Project',
      description: 'Client accepted final vector assets and brand guidelines document.',
      timeAgo: '1 week ago',
      icon: CheckCircle,
      color: 'purple',
      badge: 'Milestone',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen transition-colors duration-300">
      {/* LEFT SIDEBAR (hidden on mobile, lg:w-80 xl:w-96) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-dark-border p-8 shrink-0">
        {/* Profile section */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar circle */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue to-blue-dark flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue/25 ring-4 ring-blue/10">
            {student.initials || 'AK'}
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold text-navy dark:text-white mt-4">{student.name}</h2>

          {/* Major + University */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{student.major}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{student.university}</p>

          {/* Year badge */}
          <span className="bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light px-3 py-1 rounded-lg text-sm font-medium inline-block mt-2">
            {student.year}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-navy dark:text-white">{student.rating}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">({student.reviewCount} reviews)</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {student.skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-medium text-navy/80 dark:text-gray-300 bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border px-2.5 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Availability badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{student.availability}</span>
          </div>
        </div>

        {/* Sidebar navigation */}
        <nav className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 font-medium text-left ${
                  isActive
                    ? 'bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-hover'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue dark:text-blue-light' : 'text-gray-400 dark:text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Pro Tip Card in Sidebar */}
        <div className="mt-8 bg-gradient-to-br from-cream to-blue/5 dark:from-dark-card dark:to-blue/5 rounded-2xl p-4 border border-blue/10 dark:border-dark-border text-left">
          <p className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Pro Profile Tip</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Completing 2 more projects unlocks the Verified Senior Student badge!
          </p>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-6 lg:p-10 min-w-0">
        {/* Mobile profile card (lg:hidden) */}
        <div className="lg:hidden bg-white dark:bg-dark-card rounded-2xl p-5 border border-gray-100 dark:border-dark-border shadow-sm mb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue to-blue-dark flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue/20 shrink-0">
            {student.initials || 'AK'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-navy dark:text-white truncate">{student.name}</h2>
              <span className="bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light px-2.5 py-0.5 rounded-lg text-xs font-semibold shrink-0">
                {student.year}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {student.major} • {student.university}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-navy dark:text-white">{student.rating}</span>
                <span className="text-gray-400">({student.reviewCount})</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="truncate">{student.availability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-navy dark:text-white">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's what's happening with your projects
            </p>
          </div>

          {/* Quick Action / Bell Button */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setActiveView && setActiveView('marketplace')}
              className="inline-flex items-center gap-2 bg-blue text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-dark shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Find Projects</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:shadow-sm cursor-pointer transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue ring-2 ring-white dark:ring-dark-card" />
            </div>
          </div>
        </div>

        {/* STAT BLOCKS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Stat 1: Total Earned */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Earned</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white tracking-tight">
                {formatCurrency(student.totalEarned)}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18% from last month</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Active Projects */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Projects</span>
              <div className="w-10 h-10 rounded-xl bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white tracking-tight">
                {student.activeProjects}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-blue dark:text-blue-light mt-2">
                <span className="w-2 h-2 rounded-full bg-blue" />
                <span>2 in progress</span>
              </div>
            </div>
          </div>

          {/* Stat 3: Completed */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Completed</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white tracking-tight">
                {student.completedProjects}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>100% on-time delivery</span>
              </div>
            </div>
          </div>

          {/* Stat 4: Rating */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Rating</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-navy dark:text-white tracking-tight">
                {student.rating}/5.0
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 mt-2">
                <span>Top 5% rated student</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDED PROJECTS */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white">Recommended for You</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Matched with your skills and background</p>
            </div>
            <button
              onClick={() => setActiveView && setActiveView('marketplace')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue dark:text-blue-light hover:text-blue-dark group cursor-pointer transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {recommendedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-gray-100 dark:border-dark-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Business initials + name */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-navy/5 dark:bg-navy-light/40 text-navy dark:text-white font-bold text-xs flex items-center justify-center group-hover:bg-blue/10 group-hover:text-blue transition-colors shrink-0">
                      {project.businessInitials || 'TN'}
                    </div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">
                      {project.businessName}
                    </span>
                  </div>

                  {/* Project title */}
                  <h3 className="font-bold text-navy dark:text-white text-lg mt-3 group-hover:text-blue dark:group-hover:text-blue-light transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Skills tags (max 3) */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.skills?.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-dark-hover border border-gray-100 dark:border-dark-border px-2.5 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                  {/* Budget + deadline row */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Budget</span>
                      <span className="font-black text-navy dark:text-white text-base">
                        {formatCurrency(project.budget)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Duration</span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{project.duration || '2-3 weeks'}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Project button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-dark-hover hover:bg-blue dark:hover:bg-blue hover:text-white text-navy dark:text-white font-semibold text-sm py-2.5 px-4 rounded-xl border border-gray-100 dark:border-dark-border hover:border-transparent transition-all duration-200 group/btn"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVITY SECTION */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-navy dark:text-white">Recent Activity</h2>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Past 7 days</span>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-dark-border">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-5 flex items-start gap-4 hover:bg-gray-50/70 dark:hover:bg-dark-hover transition-colors"
                >
                  {/* Icon dot */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      item.color === 'blue'
                        ? 'bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light'
                        : item.color === 'emerald'
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Description & metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-sm font-bold text-navy dark:text-white">{item.title}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">
                        {item.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
