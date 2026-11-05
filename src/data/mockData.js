// Mock data for TEAM Talent platform

export const mockStudents = [
  {
    id: 's1',
    name: 'Aziza Karimova',
    avatar: null,
    initials: 'AK',
    major: 'Computer Science',
    university: 'Westminster International University',
    year: '3rd Year',
    rating: 4.9,
    reviewCount: 12,
    skills: ['React', 'Node.js', 'UI/UX Design', 'Python'],
    completedProjects: 8,
    activeProjects: 2,
    totalEarned: 4500000,
    bio: 'Full-stack developer passionate about building elegant user experiences. Experienced in React, Node.js, and modern web technologies.',
    availability: 'Part-time (20hrs/week)',
  },
  {
    id: 's2',
    name: 'Bobur Alimov',
    avatar: null,
    initials: 'BA',
    major: 'Marketing & Business',
    university: 'Inha University in Tashkent',
    year: '4th Year',
    rating: 4.7,
    reviewCount: 9,
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    completedProjects: 6,
    activeProjects: 1,
    totalEarned: 3200000,
    bio: 'Marketing strategist with a knack for growth hacking and data-driven campaigns. I help small businesses scale their digital presence.',
    availability: 'Full-time (Available)',
  },
];

export const mockBusinesses = [
  {
    id: 'b1',
    name: 'TechNova Solutions',
    logo: null,
    initials: 'TN',
    industry: 'Technology',
    location: 'Tashkent, Uzbekistan',
    description: 'A growing SaaS startup building HR management tools for Central Asian markets.',
    totalSpent: 8500000,
    activeProjects: 3,
    totalApplicants: 24,
  },
  {
    id: 'b2',
    name: 'GreenLeaf Organic',
    logo: null,
    initials: 'GL',
    industry: 'Food & Agriculture',
    location: 'Samarkand, Uzbekistan',
    description: 'Organic food delivery service expanding to new cities.',
    totalSpent: 3200000,
    activeProjects: 1,
    totalApplicants: 8,
  },
];

export const mockProjects = [
  {
    id: 'p1',
    title: 'E-commerce Website Redesign',
    businessId: 'b1',
    businessName: 'TechNova Solutions',
    businessInitials: 'TN',
    description: 'We need a talented frontend developer to redesign our e-commerce platform. The goal is to create a modern, conversion-optimized shopping experience that reflects our brand identity. Must be mobile-first and include a shopping cart, product filtering, and checkout flow.',
    budget: 2500000,
    deadline: '2026-11-15',
    duration: '3-4 weeks',
    category: 'IT & Development',
    skills: ['React', 'Tailwind CSS', 'E-commerce', 'Responsive Design'],
    applicants: 7,
    status: 'open',
    postedDate: '2026-10-10',
    isRemote: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'p2',
    title: 'Social Media Marketing Campaign',
    businessId: 'b2',
    businessName: 'GreenLeaf Organic',
    businessInitials: 'GL',
    description: 'Launch a comprehensive social media marketing campaign across Instagram, Telegram, and Facebook. Create engaging content, manage community interactions, and drive organic growth. Looking for creative thinkers who understand the Uzbek market.',
    budget: 1500000,
    deadline: '2026-11-01',
    duration: '2 weeks',
    category: 'Marketing',
    skills: ['Social Media', 'Content Creation', 'Analytics', 'Copywriting'],
    applicants: 12,
    status: 'open',
    postedDate: '2026-10-08',
    isRemote: true,
    difficulty: 'Beginner',
  },
  {
    id: 'p3',
    title: 'Brand Identity & Logo Design',
    businessId: 'b1',
    businessName: 'TechNova Solutions',
    businessInitials: 'TN',
    description: 'Design a complete brand identity package including logo, color palette, typography guide, and brand guidelines document. We want a modern, tech-forward look that appeals to HR professionals across Central Asia.',
    budget: 800000,
    deadline: '2026-10-30',
    duration: '1-2 weeks',
    category: 'Design',
    skills: ['Graphic Design', 'Branding', 'Figma', 'Adobe Illustrator'],
    applicants: 15,
    status: 'open',
    postedDate: '2026-10-12',
    isRemote: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'p4',
    title: 'Mobile App UI/UX Research',
    businessId: 'b2',
    businessName: 'GreenLeaf Organic',
    businessInitials: 'GL',
    description: 'Conduct user research, create personas, and develop wireframes for our upcoming food delivery mobile app. Must include user flow mapping, competitive analysis, and a clickable prototype.',
    budget: 1200000,
    deadline: '2026-11-20',
    duration: '3 weeks',
    category: 'Design',
    skills: ['UX Research', 'Wireframing', 'Figma', 'User Testing'],
    applicants: 5,
    status: 'open',
    postedDate: '2026-10-14',
    isRemote: false,
    difficulty: 'Advanced',
  },
  {
    id: 'p5',
    title: 'SEO Audit & Content Strategy',
    businessId: 'b1',
    businessName: 'TechNova Solutions',
    businessInitials: 'TN',
    description: 'Perform a comprehensive SEO audit of our website and develop a 3-month content strategy. Deliverables include keyword research, on-page optimization recommendations, content calendar, and 5 sample blog posts.',
    budget: 900000,
    deadline: '2026-11-10',
    duration: '2-3 weeks',
    category: 'Content',
    skills: ['SEO', 'Content Writing', 'Keyword Research', 'Google Analytics'],
    applicants: 9,
    status: 'open',
    postedDate: '2026-10-11',
    isRemote: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'p6',
    title: 'Python Data Analytics Dashboard',
    businessId: 'b2',
    businessName: 'GreenLeaf Organic',
    businessInitials: 'GL',
    description: 'Build an interactive data analytics dashboard using Python and a web framework. The dashboard should visualize sales data, customer demographics, delivery metrics, and inventory levels with filtering capabilities.',
    budget: 2000000,
    deadline: '2026-12-01',
    duration: '4 weeks',
    category: 'IT & Development',
    skills: ['Python', 'Data Analytics', 'Dashboard', 'SQL'],
    applicants: 4,
    status: 'open',
    postedDate: '2026-10-15',
    isRemote: true,
    difficulty: 'Advanced',
  },
];

export const mockChatMessages = [
  {
    id: 'm1',
    senderId: 'b1',
    senderName: 'TechNova Solutions',
    text: 'Hi Aziza! Thanks for applying to the E-commerce redesign project. Your portfolio looks impressive!',
    timestamp: '2026-10-15T10:30:00',
    isRead: true,
  },
  {
    id: 'm2',
    senderId: 's1',
    senderName: 'Aziza Karimova',
    text: 'Thank you! I\'m really excited about this project. I\'ve been working with React and e-commerce platforms for the past year.',
    timestamp: '2026-10-15T10:32:00',
    isRead: true,
  },
  {
    id: 'm3',
    senderId: 'b1',
    senderName: 'TechNova Solutions',
    text: 'Great to hear. Can you share some examples of similar e-commerce projects you\'ve worked on?',
    timestamp: '2026-10-15T10:35:00',
    isRead: true,
  },
  {
    id: 'm4',
    senderId: 's1',
    senderName: 'Aziza Karimova',
    text: 'Of course! I recently redesigned an online fashion store using React and Tailwind CSS. It saw a 40% increase in conversions after launch. I can share the case study.',
    timestamp: '2026-10-15T10:38:00',
    isRead: true,
  },
  {
    id: 'm5',
    senderId: 'b1',
    senderName: 'TechNova Solutions',
    text: 'That sounds perfect. When could you start if we move forward?',
    timestamp: '2026-10-15T10:40:00',
    isRead: true,
  },
  {
    id: 'm6',
    senderId: 's1',
    senderName: 'Aziza Karimova',
    text: 'I can start as early as next Monday! I\'ve already got some initial ideas for the redesign after looking at your current site.',
    timestamp: '2026-10-15T10:42:00',
    isRead: true,
  },
];

export const projectCategories = [
  'All Projects',
  'Marketing',
  'IT & Development',
  'Design',
  'Content',
  'Data & Analytics',
  'Remote Only',
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getTimeAgo = (dateStr) => {
  const now = new Date('2026-10-17');
  const posted = new Date(dateStr);
  const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
};
