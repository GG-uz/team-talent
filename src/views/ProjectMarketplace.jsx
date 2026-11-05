import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Filter,
  Briefcase,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  mockProjects,
  projectCategories,
  formatCurrency,
  getTimeAgo,
  formatDate,
} from '../data/mockData';

const ProjectMarketplace = ({ setActiveView, setSelectedProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const totalApplicants = useMemo(() => {
    return mockProjects.reduce((acc, project) => acc + (project.applicants || 0), 0);
  }, []);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Category filtering
      let matchesCategory = true;
      if (activeFilter === 'Remote Only') {
        matchesCategory = project.isRemote === true;
      } else if (activeFilter !== 'All Projects') {
        matchesCategory =
          project.category === activeFilter ||
          (activeFilter === 'Data & Analytics' &&
            (project.skills?.some((s) => s.toLowerCase().includes('data') || s.toLowerCase().includes('analytics')) ||
              project.title.toLowerCase().includes('data') ||
              project.description.toLowerCase().includes('data')));
      }

      // Search query filtering
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesCompany = project.businessName.toLowerCase().includes(query);
        const matchesSkills = project.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );
        const matchesDescription = project.description.toLowerCase().includes(query);

        matchesSearch = matchesTitle || matchesCompany || matchesSkills || matchesDescription;
      }

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const handleSelectProject = (project) => {
    if (setSelectedProject) {
      setSelectedProject(project);
    }
    if (setActiveView) {
      setActiveView('projectDetails');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All Projects');
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20';
      case 'Intermediate':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20';
      case 'Advanced':
        return 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20';
      default:
        return 'bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border';
    }
  };

  return (
    <div className="w-full min-h-screen bg-cream dark:bg-dark-bg text-navy dark:text-white grid-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* HEADER */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-navy dark:text-white leading-none">
                Explore Projects
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-normal">
                Find your next opportunity
              </p>
            </div>

            {/* Stats line badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm border border-gray-200/80 dark:border-dark-border rounded-2xl shadow-sm text-sm font-medium text-gray-600 dark:text-gray-300 self-start md:self-auto">
              <Briefcase className="w-4 h-4 text-blue" />
              <span>
                <strong className="text-navy dark:text-white">{mockProjects.length} projects</strong> available
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Users className="w-4 h-4 text-blue" />
              <span>
                <strong className="text-navy dark:text-white">{totalApplicants} total</strong> applicants
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-8">
          <div className="relative flex items-center bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-blue/20 focus-within:border-blue transition-all">
            <Search className="w-6 h-6 text-gray-400 flex-shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, skill, or company..."
              className="w-full bg-transparent text-navy dark:text-white text-lg placeholder-gray-400 dark:placeholder-gray-500 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-lg text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors ml-2"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* FILTER PILLS */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Filter className="w-3.5 h-3.5 text-blue" />
            <span>Categories</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {projectCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-xl font-medium cursor-pointer transition-all whitespace-nowrap text-sm sm:text-base ${
                    isActive
                      ? 'bg-navy dark:bg-blue text-white shadow-md shadow-navy/10'
                      : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-border hover:border-navy dark:hover:border-blue hover:text-navy dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECT GRID */}
        <div className="mt-8">
          {filteredProjects.length === 0 ? (
            <div className="bg-white dark:bg-dark-card rounded-3xl p-12 text-center border border-gray-100 dark:border-dark-border shadow-sm max-w-lg mx-auto my-12">
              <div className="w-16 h-16 bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                We couldn't find any projects matching your search criteria. Try modifying your keywords or filter.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-navy dark:bg-blue text-white rounded-xl font-semibold text-sm hover:bg-blue dark:hover:bg-blue-dark transition-colors shadow-sm"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                return (
                  <div
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className="group bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top row: Business info & time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-bold flex items-center justify-center text-sm flex-shrink-0">
                            {project.businessInitials ||
                              project.businessName
                                .split(' ')
                                .map((w) => w[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy dark:text-white leading-tight">
                              {project.businessName}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                              {getTimeAgo(project.postedDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mt-4 text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light transition-colors leading-snug">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed overflow-hidden line-clamp-2">
                        {project.description}
                      </p>

                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      {/* Bottom section: Budget and Deadline */}
                      <div className="pt-5 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light">
                            <DollarSign className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-navy dark:text-white">
                            {formatCurrency(project.budget)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatDate(project.deadline)}</span>
                        </div>
                      </div>

                      {/* Footer row: Applicants & Badges */}
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>
                            {project.applicants} {project.applicants === 1 ? 'applicant' : 'applicants'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {project.isRemote && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue/10 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue/20">
                              <MapPin className="w-3 h-3" />
                              Remote
                            </span>
                          )}
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getDifficultyClass(
                              project.difficulty
                            )}`}
                          >
                            {project.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* View Project Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProject(project);
                        }}
                        className="w-full mt-4 bg-navy dark:bg-dark-hover text-white py-3 rounded-xl font-semibold hover:bg-blue dark:hover:bg-blue transition-colors flex items-center justify-center gap-2 group-hover:bg-blue shadow-sm"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectMarketplace;
