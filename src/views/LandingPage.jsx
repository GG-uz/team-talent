import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Shield,
  ArrowRight,
  Star,
  TrendingUp,
  CheckCircle,
  Users,
  Zap,
} from 'lucide-react';

export default function LandingPage({ setActiveView }) {
  const handleViewChange = (view) => {
    if (typeof setActiveView === 'function') {
      setActiveView(view);
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg grid-pattern text-navy dark:text-white overflow-hidden transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left side: Hero Text & CTAs */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              {/* Badge pill */}
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue/10 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm border border-blue-100/60 dark:border-blue/20 mb-6">
                <span>🚀 The Future of Student Talent</span>
              </div>

              {/* Massive headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-navy dark:text-white">
                Real Projects.
                <br />
                Real Experience.
                <br />
                <span className="text-blue dark:text-blue-light">Real Opportunities.</span>
              </h1>

              {/* Subtitle paragraph */}
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mt-6 leading-relaxed">
                Connect with top university talent to tackle real challenges, build verified portfolios, and hire the next generation of ambitious builders.
              </p>

              {/* Two CTA buttons side by side */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleViewChange('marketplace')}
                  className="bg-blue text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-dark hover:scale-105 shadow-lg shadow-blue/25 transition-all duration-200 text-center flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Find Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleViewChange('onboarding')}
                  className="bg-white dark:bg-dark-card border-2 border-navy dark:border-dark-border text-navy dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-navy hover:text-white dark:hover:bg-blue dark:hover:border-blue hover:scale-105 transition-all duration-200 text-center cursor-pointer shadow-sm"
                >
                  Hire Students
                </button>
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mt-6">
                <span className="text-amber-500">✨</span>
                <span>500+ projects completed • 200+ active students</span>
              </div>
            </div>

            {/* Right side: Abstract visual composition (hidden on mobile) */}
            <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative">
              <div className="relative w-full max-w-lg h-[480px] rounded-3xl bg-gradient-to-br from-blue/10 via-blue/5 to-transparent border border-blue/10 dark:border-blue/20 p-6 flex items-center justify-center shadow-2xl shadow-blue/5 overflow-hidden">
                
                {/* Decorative colored blobs */}
                <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-blue/20 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-36 h-36 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

                {/* Floating Card 1: Stat card */}
                <div className="absolute top-8 left-6 bg-white dark:bg-dark-card rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-dark-border animate-float animation-delay-100 z-10 w-56">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Projects Completed
                    </span>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                      +28%
                    </span>
                  </div>
                  <div className="text-3xl font-black text-navy dark:text-white tracking-tight">1,247</div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1 font-medium">
                    <Users className="w-3 h-3 text-blue" /> Across top universities
                  </p>
                </div>

                {/* Floating Card 2: Mini profile card */}
                <div className="absolute bottom-8 left-8 bg-white dark:bg-dark-card rounded-2xl shadow-md p-3 border border-gray-100 dark:border-dark-border animate-float animation-delay-300 z-20 w-64">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy dark:bg-blue text-white font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-blue/20">
                      AK
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-navy dark:text-white truncate">Aziza Karimova</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">UI/UX & Frontend Developer</p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-navy dark:text-white">4.9</span>
                      <span className="text-gray-400 text-[11px]">(12 reviews)</span>
                    </div>
                    <span className="inline-flex items-center text-[10px] font-bold text-blue dark:text-blue-light bg-blue-50 dark:bg-blue/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Floating Card 3: Budget pill card */}
                <div className="absolute top-36 right-6 bg-white dark:bg-dark-card rounded-2xl shadow-lg p-3 px-4 border border-gray-100 dark:border-dark-border animate-float animation-delay-500 z-30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Escrow Guaranteed
                      </div>
                      <div className="text-lg font-black text-navy dark:text-white tracking-tight">
                        2,500,000 UZS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle center accent tag */}
                <div className="absolute bottom-28 right-8 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-2xl shadow-md p-2.5 px-3.5 border border-gray-100 dark:border-dark-border animate-float animation-delay-200 z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-navy dark:text-white">Matching live bids</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-16 lg:py-24 border-t border-gray-100/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading & subtitle */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-navy dark:text-white">
              Why TEAM Talent?
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-3">
              Built for students and businesses alike
            </p>
          </div>

          {/* 3-column feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-dark-border flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light mb-6 group-hover:scale-110 group-hover:bg-blue group-hover:text-white transition-all duration-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                Real-World Projects
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Work on actual business challenges posted by vetted companies and fast-growing startups. Gain practical experience that truly stands out to future employers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-dark-border flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light mb-6 group-hover:scale-110 group-hover:bg-blue group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                Build Your Portfolio
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Every completed project adds to your professional profile with verified ratings, client testimonials, and showcase links that prove your real-world capabilities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-dark-border flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light mb-6 group-hover:scale-110 group-hover:bg-blue group-hover:text-white transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Funds are held in escrow and released upon project completion and milestone approval. Transparent, reliable, and guaranteed for both students and businesses.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 lg:py-28 bg-white/50 dark:bg-dark-surface/50 border-t border-b border-gray-100/80 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue/10 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
              <Zap className="w-4 h-4" />
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-navy dark:text-white">
              How It Works
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-3">
              From signing up to getting paid in three clear, frictionless steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting dotted line for desktop */}
            <div
              className="hidden md:block absolute top-7 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-gray-300 dark:border-dark-border pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue/25 mb-6 ring-4 ring-white dark:ring-dark-card">
                  1
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                  Create Your Profile
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                  Sign up in minutes. Showcase your university, highlight your core skills, upload portfolio samples, or post your business project needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-navy dark:bg-dark-card dark:border dark:border-dark-border text-white font-black text-xl flex items-center justify-center shadow-lg shadow-navy/20 mb-6 ring-4 ring-white dark:ring-dark-surface">
                  2
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                  Find & Apply
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                  Browse vetted opportunities with clear scopes and budgets, or review top student applications to select the perfect match for your tasks.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue/25 mb-6 ring-4 ring-white dark:ring-dark-card">
                  3
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                  Deliver & Earn
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                  Collaborate smoothly on deliverables, release escrow payments upon approval, and earn verified ratings that boost your professional journey.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER AT BOTTOM */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy dark:bg-dark-card dark:border dark:border-dark-border rounded-3xl text-white p-12 sm:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background decorative glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-blue-100/80 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                Join 500+ students and growing businesses building real-world experience and lasting connections today.
              </p>
              <button
                type="button"
                onClick={() => handleViewChange('onboarding')}
                className="bg-white text-navy dark:bg-blue dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-blue-dark hover:scale-105 shadow-xl transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-navy dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
