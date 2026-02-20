
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
      },
      {
        id: 'swe-2',
        task: "The team is debating between a fast solution that might crash later vs a slower, stable one. You choose?",
        options: [
          { label: "Speed first", description: "Launch now, fix later.", isCorrect: false, feedback: "This creates 'technical debt' which can hurt the project later." },
          { label: "Stability first", description: "Build it right, even if it takes more time.", isCorrect: true, feedback: "Great! Quality and reliability are the hallmarks of a pro engineer." }
        ]
      }
    ]
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
      { name: 'State Medical Entrances', description: 'Alternative state-level government medical seats.', frequency: 'Annual', eligibility: 'High School' },
      { name: 'AIIMS / JIPMER (via NEET)', description: 'Entrance for India\'s premier medical institutes.', frequency: 'Annual', eligibility: 'High School' }
    ],
    backupCareers: [
      { id: 'physio', name: 'Physiotherapist', matchReason: 'Allows you to heal and help patients through physical therapy.' },
      { id: 'bio-sci', name: 'Biomedical Scientist', matchReason: 'Focuses on the science behind healthcare and lab research.' }
    ],
    simulation: [
      {
        id: 'doc-1',
        task: "A patient comes in with a high fever and a cough. They are worried. How do you start?",
        options: [
          { label: "Listen carefully", description: "Ask them to describe their symptoms in detail.", isCorrect: true, feedback: "Excellent. Empathy and listening are 50% of the cure." },
          { label: "Order all tests", description: "Send them for MRI and Blood tests immediately.", isCorrect: false, feedback: "Tests are expensive. Start with a physical checkup and history first." }
        ]
      },
      {
        id: 'doc-2',
        task: "It's the end of a long 12-hour shift, but an emergency case just arrived. What do you do?",
        options: [
          { label: "Stay and help", description: "Your energy is low, but the patient needs you.", isCorrect: true, feedback: "Medicine is a calling. Resilience is key, though self-care is also vital later." },
          { label: "Go home", description: "Shift is over, someone else will handle it.", isCorrect: false, feedback: "In emergencies, every hand counts. Doctors often go above and beyond." }
        ]
      }
    ]
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
      name: 'IGRUA Entrance / Flying Club Entrances',
      description: 'The standard entry for premier flight training institutes.',
      frequency: 'Annual',
      eligibility: '10+2 (Physics & Maths)'
    },
    alternativeExams: [
      { name: 'NDA (Air Force)', description: 'Entrance for Indian Air Force pilot training.', frequency: 'Bi-Annual', eligibility: '10+2' }
    ],
    backupCareers: [
      { id: 'atc', name: 'Air Traffic Controller', matchReason: 'Uses the same aviation knowledge and high-pressure coordination.' }
    ],
    simulation: [
      {
        id: 'pilot-1',
        task: "Mid-flight, you encounter unexpected heavy turbulence. Your passengers are getting scared.",
        options: [
          { label: "Calm announcement", description: "Explain the situation and reassure them.", isCorrect: true, feedback: "Great leadership. Communication prevents panic." },
          { label: "Ignore it", description: "Just focus on the controls.", isCorrect: false, feedback: "Passengers look to the cockpit for reassurance during bumpy rides." }
        ]
      }
    ]
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
      name: 'Degree in Music / Trinity Certifications',
      description: 'Formal academic degree or international certification levels.',
      frequency: 'Bi-Annual',
      eligibility: 'Open Entry'
    },
    alternativeExams: [
      { name: 'Reality Show Auditions', description: 'Direct platform for mass exposure and talent discovery.', frequency: 'Annual', eligibility: 'Talent-based' }
    ],
    backupCareers: [
      { id: 'music-teacher', name: 'Music Educator', matchReason: 'Pass on your skills to the next generation.' }
    ],
    simulation: [
      {
        id: 'singer-1',
        task: "You're recording a new song and the producer asks you to change your style slightly. How do you respond?",
        options: [
          { label: "Collaborate", description: "Try the new style and see how it sounds.", isCorrect: true, feedback: "Collaboration is huge in the arts. Flexibility helps you grow." },
          { label: "Refuse", description: "My style is my identity, I won't change.", isCorrect: false, feedback: "Growth often happens when we step out of our comfort zone." }
        ]
      }
    ]
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
