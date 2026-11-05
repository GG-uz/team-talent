import React from 'react';
import { GraduationCap, Building2, CheckCircle, ArrowRight } from 'lucide-react';

const studentBenefits = [
  'Browse paid projects',
  'Build your portfolio',
  'Get real experience',
  'Earn money',
];

const businessBenefits = [
  'Post projects',
  'Review applications',
  'Manage talent',
  'Secure payments',
];

const Onboarding = ({ setCurrentUserRole, setActiveView }) => {
  const handleSelectRole = (role, defaultView) => {
    if (setCurrentUserRole) {
      setCurrentUserRole(role);
    }
    if (setActiveView) {
      setActiveView(defaultView);
    }
  };

  const handleKeyDown = (e, role, defaultView) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectRole(role, defaultView);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center transition-colors duration-300">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-center text-navy dark:text-white leading-tight">
            How will you use TEAM Talent?
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4">
            Choose your role to get a personalized experience
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Card 1 - Student */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelectRole('student', 'studentDashboard')}
            onKeyDown={(e) => handleKeyDown(e, 'student', 'studentDashboard')}
            className="group bg-white dark:bg-dark-card rounded-3xl p-10 border-2 border-transparent dark:border-dark-border hover:border-blue dark:hover:border-blue cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-4 focus:ring-blue/20"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold mt-6 text-navy dark:text-white">
                I'm a Student
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
                Find real projects, build your portfolio, and earn while you learn.
              </p>

              <ul className="mt-8 space-y-3.5">
                {studentBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm font-medium text-navy/80 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue mr-3 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-blue font-semibold text-sm group-hover:translate-x-0.5 transition-transform duration-300">
              <span>Continue as Student</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Card 2 - Business */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelectRole('business', 'businessDashboard')}
            onKeyDown={(e) => handleKeyDown(e, 'business', 'businessDashboard')}
            className="group bg-white dark:bg-dark-card rounded-3xl p-10 border-2 border-transparent dark:border-dark-border hover:border-blue dark:hover:border-blue cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-4 focus:ring-blue/20"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                <Building2 className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold mt-6 text-navy dark:text-white">
                I'm a Business
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
                Access top university talent for your projects at affordable rates.
              </p>

              <ul className="mt-8 space-y-3.5">
                {businessBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm font-medium text-navy/80 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue mr-3 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-blue font-semibold text-sm group-hover:translate-x-0.5 transition-transform duration-300">
              <span>Continue as Business</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-12">
          You can always switch roles later
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
