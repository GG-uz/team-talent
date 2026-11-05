import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  DollarSign,
  Users,
  MapPin,
  CheckCircle,
  X,
  Send,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatDate, getTimeAgo } from '../data/mockData';

const ProjectDetails = ({ project, setActiveView, currentUserRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    pitch: '',
    expectedTime: '',
    submitted: false,
  });

  const handleOpenModal = () => {
    setFormState({
      pitch: '',
      expectedTime: '',
      submitted: false,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      submitted: true,
    }));
  };

  // If no project is selected or project is null
  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setActiveView('marketplace')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white cursor-pointer mb-8 transition-colors group font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-dark-border shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-dark-surface text-gray-400 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">No Project Selected</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            It looks like no project was selected or the requested project could not be found.
          </p>
          <button
            onClick={() => setActiveView('marketplace')}
            className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-blue-dark hover:scale-[1.02] shadow-lg shadow-blue/25 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Marketplace</span>
          </button>
        </div>
      </div>
    );
  }

  const businessInitials =
    project.businessInitials ||
    (project.businessName
      ? project.businessName
          .split(' ')
          .map((word) => word[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'CO');

  const canApply = currentUserRole === 'student' || currentUserRole === null || currentUserRole === undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 transition-colors duration-300">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('marketplace')}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white cursor-pointer mb-8 transition-colors group font-medium"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Projects</span>
      </button>

      {/* Main Card */}
      <div className="bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-10 border border-gray-100 dark:border-dark-border shadow-sm">
        {/* Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-bold flex items-center justify-center text-base shrink-0">
                {businessInitials}
              </div>
              <div>
                <h3 className="font-bold text-navy dark:text-white text-base leading-snug">
                  {project.businessName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Posted {getTimeAgo(project.postedDate)}</span>
                </p>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-500/20 px-3 py-1 rounded-full text-sm font-medium">
                Open for Applications
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-white mt-4 leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-4 transition-colors hover:bg-gray-100/70 dark:hover:bg-dark-hover">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <DollarSign className="w-4 h-4 text-blue" />
              <span>Budget</span>
            </div>
            <div className="text-lg font-bold text-navy dark:text-white">
              {formatCurrency(project.budget)}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-4 transition-colors hover:bg-gray-100/70 dark:hover:bg-dark-hover">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4 text-blue" />
              <span>Deadline</span>
            </div>
            <div className="text-lg font-bold text-navy dark:text-white">
              {formatDate(project.deadline)}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-4 transition-colors hover:bg-gray-100/70 dark:hover:bg-dark-hover">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Clock className="w-4 h-4 text-blue" />
              <span>Duration</span>
            </div>
            <div className="text-lg font-bold text-navy dark:text-white">
              {project.duration || 'Flexible'}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-4 transition-colors hover:bg-gray-100/70 dark:hover:bg-dark-hover">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Briefcase className="w-4 h-4 text-blue" />
              <span>Difficulty</span>
            </div>
            <div className="text-lg font-bold text-navy dark:text-white">
              {project.difficulty || 'All levels'}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-navy dark:text-white">Project Description</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3 whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Required Skills */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-navy dark:text-white">Required Skills</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.skills && project.skills.length > 0 ? (
              project.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue/5 dark:bg-blue/10 text-blue dark:text-blue-light px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue/10 dark:hover:bg-blue/20 transition-colors"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-500">No specific skills listed</span>
            )}
          </div>
        </div>

        {/* Sidebar Info (Bottom Row) */}
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-navy dark:text-white">{project.applicants || 0}</span>
              <span>applicants</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-dark-surface text-navy dark:text-gray-300 font-medium text-xs">
                {project.isRemote ? 'Remote Friendly' : 'On-site'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {canApply && (
          <div className="mt-8">
            <button
              onClick={handleOpenModal}
              className="w-full bg-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-dark hover:scale-[1.02] shadow-lg shadow-blue/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Send className="w-5 h-5" />
              <span>Apply for This Project</span>
            </button>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 max-w-lg w-full animate-fade-in relative shadow-2xl border border-gray-100 dark:border-dark-border">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-navy dark:hover:text-white cursor-pointer transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!formState.submitted ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-navy dark:text-white tracking-tight">
                    Apply for Project
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {project.title}
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-navy dark:text-white mb-2">
                      Why are you a great fit?
                    </label>
                    <textarea
                      required
                      value={formState.pitch}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, pitch: e.target.value }))
                      }
                      placeholder="Highlight your relevant experience, approach, or why you're excited about this project..."
                      className="w-full rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface p-4 min-h-[120px] resize-none focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white dark:placeholder-gray-500 text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy dark:text-white mb-2">
                      Expected completion time
                    </label>
                    <select
                      required
                      value={formState.expectedTime}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          expectedTime: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 dark:border-dark-border p-3 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 text-navy dark:text-white text-sm bg-white dark:bg-dark-surface"
                    >
                      <option value="" disabled>
                        Select expected completion time
                      </option>
                      <option value="Less than 1 week">Less than 1 week</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1 month+">1 month+</option>
                      <option value="Flexible / As agreed">Flexible / As agreed</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors cursor-pointer text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-semibold text-white bg-blue hover:bg-blue-dark shadow-md shadow-blue/20 transition-all cursor-pointer flex items-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce-short" />
                </div>
                <h3 className="text-2xl font-black text-navy dark:text-white tracking-tight mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  We'll notify you when the business reviews your application. You can track your applications in your dashboard.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                    setActiveView('marketplace');
                  }}
                  className="w-full bg-blue text-white py-3.5 rounded-2xl font-bold hover:bg-blue-dark transition-all cursor-pointer shadow-lg shadow-blue/25"
                >
                  Back to Projects
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
