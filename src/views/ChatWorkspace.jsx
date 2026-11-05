import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  ArrowLeft,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Circle,
  PanelLeftOpen,
  Star,
  X,
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react';
import {
  mockChatMessages,
  mockProjects,
  mockStudents,
  mockBusinesses,
  formatCurrency,
  formatDate,
} from '../data/mockData';

const ChatWorkspace = ({ currentUserRole = 'student', setActiveView }) => {
  const project = mockProjects[0];
  const student = mockStudents[0];
  const business = mockBusinesses[0];

  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Initial Design Mockups', completed: true },
    { id: 2, title: 'Frontend Development', completed: true },
    { id: 3, title: 'Final Review & Delivery', completed: false },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBackToDashboard = () => {
    const targetDashboard =
      currentUserRole === 'business' ? 'businessDashboard' : 'studentDashboard';
    if (setActiveView) {
      setActiveView(targetDashboard);
    }
  };

  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const isStudent = currentUserRole === 'student';
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: isStudent ? 's1' : 'b1',
      senderName: isStudent ? student.name : business.name,
      text: trimmed,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return timestamp;
    }
  };

  const toggleMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  // Participant to display in chat header & info card
  const otherParticipant =
    currentUserRole === 'business'
      ? {
          name: student.name,
          initials: student.initials,
          role: 'Student Freelancer',
          subtext: `${student.major} • ${student.university}`,
        }
      : {
          name: business.name,
          initials: business.initials,
          role: 'Business Client',
          subtext: `${business.industry} • ${business.location}`,
        };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] w-full overflow-hidden bg-cream dark:bg-dark-bg relative transition-colors duration-300">
      {/* Mobile Backdrop for Left Drawer */}
      {isMobilePanelOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobilePanelOpen(false)}
        />
      )}

      {/* LEFT PANE - Project Context */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 sm:w-96 bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-dark-border p-6 overflow-y-auto 
          transition-transform duration-300 ease-in-out lg:static lg:w-96 lg:translate-x-0 lg:z-auto
          flex flex-col justify-between shrink-0
          ${isMobilePanelOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div>
          {/* Top Bar with Back Button & Mobile Close Button */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={() => setIsMobilePanelOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
              aria-label="Close project panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Info Section */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-navy dark:text-white leading-snug">
                {project.title}
              </h1>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                In Progress
              </span>
            </div>
          </div>

          {/* Project Details Cards */}
          <div className="mt-6 space-y-3">
            <div className="bg-gray-50 dark:bg-dark-card rounded-xl p-4 flex items-center justify-between border border-gray-100/80 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Budget</p>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    {formatCurrency(project.budget)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-card rounded-xl p-4 flex items-center justify-between border border-gray-100/80 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Deadline</p>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-card rounded-xl p-4 flex items-center justify-between border border-gray-100/80 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Duration</p>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    {project.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Participant Info */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Participants
            </h2>
            <div className="bg-gray-50 dark:bg-dark-card rounded-xl p-3 border border-gray-100 dark:border-dark-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-bold flex items-center justify-center text-sm shrink-0">
                {otherParticipant.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy dark:text-white truncate">
                  {otherParticipant.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {otherParticipant.role}
                </p>
              </div>
            </div>
          </div>

          {/* Project Milestones Mockup */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Milestones
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                {milestones.filter((m) => m.completed).length}/{milestones.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  onClick={() => toggleMilestone(milestone.id)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-card transition-colors cursor-pointer group"
                >
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue dark:group-hover:text-blue-light shrink-0 mt-0.5 transition-colors" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        milestone.completed
                          ? 'text-gray-400 dark:text-gray-500 line-through'
                          : 'text-navy dark:text-white'
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <span
                      className={`text-xs inline-block mt-0.5 ${
                        milestone.completed
                          ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                          : 'text-blue dark:text-blue-light font-medium'
                      }`}
                    >
                      {milestone.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-dark-border text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            TEAM Talent Escrow Protected • 100% Secure
          </p>
        </div>
      </aside>

      {/* RIGHT PANE - Chat Interface */}
      <section className="flex-1 flex flex-col h-full overflow-hidden bg-cream/40 dark:bg-dark-bg">
        {/* Chat Header */}
        <header className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-dark-border px-6 py-4 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile panel toggle */}
            <button
              onClick={() => setIsMobilePanelOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
              title="Toggle Project Details"
              aria-label="Toggle Project Details"
            >
              <PanelLeftOpen className="w-5 h-5" />
            </button>

            {/* Avatar & Participant Name */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light font-bold flex items-center justify-center text-sm">
                {otherParticipant.initials}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-dark-surface" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy dark:text-white text-base truncate">
                  {otherParticipant.name}
                </h3>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                {otherParticipant.subtext}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="hidden sm:flex w-9 h-9 rounded-xl text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover items-center justify-center transition-colors"
              title="Start voice call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              className="hidden sm:flex w-9 h-9 rounded-xl text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover items-center justify-center transition-colors"
              title="Start video call"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              className="hidden sm:flex w-9 h-9 rounded-xl text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover items-center justify-center transition-colors"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Mark Completed & Pay button for Business */}
            {currentUserRole === 'business' && (
              <button
                onClick={() => setShowCompletionModal(true)}
                className="bg-emerald-500 text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-sm text-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden xs:inline">Mark Completed & Pay</span>
                <span className="xs:hidden">Pay</span>
              </button>
            )}
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-cream/50 dark:bg-dark-bg">
          {/* Encrypted Notice Banner */}
          <div className="flex justify-center mb-2">
            <span className="text-[11px] text-gray-400 dark:text-gray-500 bg-white/70 dark:bg-dark-card/70 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-gray-100 dark:border-dark-border shadow-2xs font-medium">
              🔒 Messages and workspace deliverables are monitored & backed by TEAM Talent guarantee
            </span>
          </div>

          {messages.map((msg) => {
            const isMyMessage =
              currentUserRole === 'student'
                ? msg.senderId === 's1'
                : msg.senderId === 'b1';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isMyMessage ? 'items-end' : 'items-start'
                }`}
              >
                {!isMyMessage && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 ml-1">
                    {msg.senderName}
                  </span>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[70%] px-5 py-3 shadow-sm ${
                    isMyMessage
                      ? 'bg-blue text-white rounded-2xl rounded-br-md'
                      : 'bg-white dark:bg-dark-card text-navy dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-100 dark:border-dark-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                </div>

                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">
                  {formatMessageTime(msg.timestamp)}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border px-4 sm:px-6 py-4 shrink-0">
          <div className="flex items-end gap-2 sm:gap-3">
            {/* Attachment Button */}
            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-500 dark:text-gray-400 flex items-center justify-center shrink-0 transition-colors border border-gray-100 dark:border-dark-border cursor-pointer"
              title="Attach files or mockups"
              onClick={() => alert('Deliverable / Attachment upload simulated!')}
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Textarea Input */}
            <textarea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 dark:bg-dark-card rounded-2xl px-5 py-3.5 resize-none outline-none focus:ring-2 focus:ring-blue/20 border border-gray-200 dark:border-dark-border text-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm max-h-32 min-h-[48px] transition-all"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`w-10 h-10 rounded-xl bg-blue text-white hover:bg-blue-dark flex items-center justify-center shrink-0 transition-all ${
                !newMessage.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-95 cursor-pointer shadow-sm shadow-blue/30'
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-1 text-[11px] text-gray-400 dark:text-gray-500">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="hidden sm:inline">Active Project: {project.title}</span>
          </div>
        </div>
      </section>

      {/* Completion Modal for Business Role */}
      {showCompletionModal && (
        <div className="bg-black/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 animate-fade-in shadow-2xl relative border border-gray-100 dark:border-dark-border">
            {/* Close Button */}
            <button
              onClick={() => setShowCompletionModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              {/* Big Emerald CheckCircle */}
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-black text-navy dark:text-white tracking-tight">
                Project Completed! 🎉
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                Payment of{' '}
                <span className="font-bold text-navy dark:text-white">
                  {formatCurrency(project.budget)}
                </span>{' '}
                has been released to{' '}
                <span className="font-bold text-navy dark:text-white">{student.name}</span>.
              </p>

              {/* Star Rating Section */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
                <p className="text-sm font-semibold text-navy dark:text-white mb-3">
                  Rate your experience
                </p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled =
                      hoverRating > 0
                        ? starVal <= hoverRating
                        : starVal <= rating;

                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-400 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${starVal} stars`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-200 dark:text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
                  {rating === 5
                    ? 'Outstanding! Highly Recommended'
                    : rating >= 4
                    ? 'Great experience'
                    : 'Satisfactory work'}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setShowCompletionModal(false);
                    if (setActiveView) {
                      setActiveView('businessDashboard');
                    }
                  }}
                  className="w-full bg-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-dark active:scale-[0.99] transition-all shadow-md shadow-blue/20 cursor-pointer text-sm"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWorkspace;
