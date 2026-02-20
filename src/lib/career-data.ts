
export interface Exam {
  name: string;
  description: string;
  frequency: string;
  eligibility: string;
}

export interface BackupPath {
  id: string;
  name: string;
  matchReason: string;
}

export interface RealityMetrics {
  pressure: 'low' | 'moderate' | 'high';
  balance: 'flexible' | 'structured' | 'demanding';
  stability: 'variable' | 'growing' | 'stable';
}

export interface SimulationOption {
  label: string;
  description: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SimulationScenario {
  id: string;
  task: string;
  options: SimulationOption[];
}

export interface CareerPath {
  id: string;
  name: string;
  role: string;
  eligibility: string;
  skills: string[];
  salary: string;
  domainId: string;
  description: string;
  primaryExam: Exam;
  alternativeExams: Exam[];
  backupCareers: BackupPath[];
  virtualExperienceUrl?: string;
  reality: RealityMetrics;
  simulation: SimulationScenario[];
}

export interface CareerDomain {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const DOMAINS: CareerDomain[] = [
  { id: 'tech', name: 'Technology', icon: 'Cpu', description: 'Building the digital future.' },
  { id: 'health', name: 'Healthcare', icon: 'Stethoscope', description: 'Caring for humanity.' },
  { id: 'aviation', name: 'Aviation & Logistics', icon: 'Plane', description: 'Mastering the skies and global movement.' },
  { id: 'arts', name: 'Arts & Design', icon: 'Palette', description: 'Shaping visual experiences.' },
  { id: 'business', name: 'Business', icon: 'Briefcase', description: 'Managing markets and growth.' },
  { id: 'science', name: 'Pure Science', icon: 'Microscope', description: 'Unlocking the laws of nature.' },
  { id: 'edu', name: 'Education', icon: 'GraduationCap', description: 'Empowering the next generation.' },
  { id: 'law', name: 'Law & Policy', icon: 'Scale', description: 'Upholding justice and order.' },
  { id: 'eng', name: 'Engineering', icon: 'Wrench', description: 'Solving real-world problems.' },
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'swe',
    name: 'Software Engineer',
    role: 'Develops applications and systems.',
    eligibility: 'Bachelor\'s in Computer Science or related field.',
    skills: ['Python', 'Problem Solving', 'System Design'],
    salary: '₹6L - ₹35L+',
    domainId: 'tech',
    description: 'Transform ideas into digital realities using code.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/D3SGKyBcUjA',
    reality: {
      pressure: 'moderate',
      balance: 'flexible',
      stability: 'growing'
    },
    primaryExam: {
      name: 'JEE Mains & Advanced',
      description: 'The standard entry path for top engineering institutes.',
      frequency: 'Annual',
      eligibility: 'High School (Science Stream)'
    },
    alternativeExams: [
      { name: 'BITSAT / VITEEE', description: 'Exams for premier private universities.', frequency: 'Annual', eligibility: 'High School' },
      { name: 'CUET', description: 'Entrance for Central Universities with CS programs.', frequency: 'Annual', eligibility: 'High School' }
    ],
    backupCareers: [
      { id: 'da', name: 'Data Analyst', matchReason: 'Uses the same logical thinking and coding foundations.' },
      { id: 'it-con', name: 'IT Consultant', matchReason: 'Focuses on system architecture and business solutions.' }
    ],
    simulation: [
      {
        id: 'swe-1',
        task: "A user reports that the 'Login' button isn't working on the mobile app. What's your first move?",
        options: [
          { label: "Rewrite the code", description: "Start from scratch for the login module.", isCorrect: false, feedback: "A bit extreme! Always try to find the root cause first." },
          { label: "Check logs", description: "Look at the server logs to see the specific error.", isCorrect: true, feedback: "Perfect. Data-driven debugging saves hours of work." },
          { label: "Blame the internet", description: "Tell the user their connection is bad.", isCorrect: false, feedback: "Not very helpful. We must ensure our app is resilient." }
        ]
      }
    ]
  },
  {
    id: 'architect',
    name: 'Architect',
    role: 'Designs and plans buildings and structures.',
    eligibility: 'Bachelor of Architecture (B.Arch).',
    skills: ['AutoCAD', 'Sketching', 'Spatial Design'],
    salary: '₹4L - ₹25L+',
    domainId: 'eng',
    description: 'Blend art and engineering to shape the skyline.',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'NATA', description: 'National Aptitude Test in Architecture.', frequency: 'Annual', eligibility: '12th (Physics, Chem, Math)' },
    alternativeExams: [
      { name: 'JEE Paper 2', description: 'Entrance for B.Arch in NITs and SPAs.', frequency: 'Annual', eligibility: '12th' }
    ],
    backupCareers: [
      { id: 'int-des', name: 'Interior Designer', matchReason: 'Focuses on the aesthetics and function of indoor spaces.' }
    ],
    simulation: []
  },
  {
    id: 'lawyer',
    name: 'Corporate Lawyer',
    role: 'Advises businesses on legal rights and obligations.',
    eligibility: 'Integrated LLB (5 years) or LLB (3 years).',
    skills: ['Critical Thinking', 'Negotiation', 'Research'],
    salary: '₹8L - ₹40L+',
    domainId: 'law',
    description: 'Navigate the complex world of corporate regulations and justice.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'stable' },
    primaryExam: { name: 'CLAT', description: 'Common Law Admission Test for National Law Universities.', frequency: 'Annual', eligibility: '12th' },
    alternativeExams: [
      { name: 'AILET', description: 'Entrance for National Law University, Delhi.', frequency: 'Annual', eligibility: '12th' }
    ],
    backupCareers: [
      { id: 'legal-analyst', name: 'Legal Analyst', matchReason: 'Involves intensive research and documentation support.' }
    ],
    simulation: []
  },
  {
    id: 'chef',
    name: 'Executive Chef',
    role: 'Manages kitchen operations and creates culinary masterpieces.',
    eligibility: 'Degree/Diploma in Hotel Management.',
    skills: ['Culinary Arts', 'Leadership', 'Creativity'],
    salary: '₹5L - ₹30L+',
    domainId: 'arts',
    description: 'Transform ingredients into unforgettable sensory experiences.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'variable' },
    primaryExam: { name: 'NCHMCT JEE', description: 'Entrance for top Institute of Hotel Management (IHM) branches.', frequency: 'Annual', eligibility: '12th' },
    alternativeExams: [],
    backupCareers: [
      { id: 'food-stylist', name: 'Food Stylist', matchReason: 'Focuses on the visual presentation of food for media.' }
    ],
    simulation: []
  },
  {
    id: 'doctor',
    name: 'Doctor',
    role: 'Specializes in clinical health and medicine.',
    eligibility: 'MBBS + MD/MS Degree.',
    skills: ['Surgery', 'Diagnosis', 'Patient Care'],
    salary: '₹8L - ₹50L+',
    domainId: 'health',
    description: 'Treat complex conditions and save lives through clinical excellence.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/JBty9sV7Omc',
    reality: {
      pressure: 'high',
      balance: 'demanding',
      stability: 'stable'
    },
    primaryExam: {
      name: 'NEET UG',
      description: 'The primary gateway to medical school (MBBS) in India.',
      frequency: 'Annual',
      eligibility: 'High School (Biology Stream)'
    },
    alternativeExams: [
      { name: 'State Medical Entrances', description: 'Alternative state-level government medical seats.', frequency: 'Annual', eligibility: 'High School' }
    ],
    backupCareers: [
      { id: 'physio', name: 'Physiotherapist', matchReason: 'Allows you to heal and help patients through physical therapy.' }
    ],
    simulation: []
  },
  {
    id: 'pilot',
    name: 'Commercial Pilot',
    role: 'Operates commercial aircraft for airlines.',
    eligibility: '10+2 with Physics and Maths + Commercial Pilot License (CPL).',
    skills: ['Navigation', 'Meteorology', 'Quick Decision Making'],
    salary: '₹10L - ₹80L+',
    domainId: 'aviation',
    description: 'Command the skies and connect the world through aviation.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/wrtFLhwu168',
    reality: {
      pressure: 'high',
      balance: 'structured',
      stability: 'stable'
    },
    primaryExam: {
      name: 'IGRUA Entrance',
      description: 'The standard entry for premier flight training institutes.',
      frequency: 'Annual',
      eligibility: '10+2 (Physics & Maths)'
    },
    alternativeExams: [],
    backupCareers: [
      { id: 'atc', name: 'Air Traffic Controller', matchReason: 'Uses the same aviation knowledge and high-pressure coordination.' }
    ],
    simulation: []
  },
  {
    id: 'singer',
    name: 'Professional Singer',
    role: 'Vocal performer for studio recordings and live shows.',
    eligibility: 'Training in Classical or Contemporary Music.',
    skills: ['Vocal Control', 'Performance', 'Composition'],
    salary: '₹3L - ₹50L+',
    domainId: 'arts',
    description: 'Express emotions and stories through the power of your voice.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/2vS_6-A0GTo',
    reality: {
      pressure: 'moderate',
      balance: 'flexible',
      stability: 'variable'
    },
    primaryExam: {
      name: 'Trinity Certifications',
      description: 'International certification levels in music.',
      frequency: 'Bi-Annual',
      eligibility: 'Open Entry'
    },
    alternativeExams: [],
    backupCareers: [
      { id: 'music-teacher', name: 'Music Educator', matchReason: 'Pass on your skills to the next generation.' }
    ],
    simulation: []
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
