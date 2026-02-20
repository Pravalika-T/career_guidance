
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
      { id: 'bio-sci', name: 'Biomedical Scientist', matchReason: 'Focuses on the science behind healthcare and lab research.' },
      { id: 'nursing', name: 'Nursing Specialist', matchReason: 'Critical frontline healthcare and direct patient interaction.' }
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
      { name: 'NDA (Air Force)', description: 'Entrance for Indian Air Force pilot training.', frequency: 'Bi-Annual', eligibility: '10+2' },
      { name: 'B.Sc. Aviation + CPL', description: 'Academic degree combined with private flight training.', frequency: 'Annual', eligibility: '10+2' }
    ],
    backupCareers: [
      { id: 'atc', name: 'Air Traffic Controller', matchReason: 'Uses the same aviation knowledge and high-pressure coordination.' },
      { id: 'cabin-crew', name: 'Cabin Crew / Ground Staff', matchReason: 'Involves aircraft operations and passenger safety.' },
      { id: 'aero-eng', name: 'Aerospace Engineer', matchReason: 'Focuses on the technical side of how planes fly.' }
    ]
  },
  {
    id: 'ai-res',
    name: 'AI Researcher',
    role: 'Pushes the boundaries of machine intelligence.',
    eligibility: 'PhD or Master\'s in AI/ML.',
    skills: ['Mathematics', 'TensorFlow', 'Deep Learning'],
    salary: '₹12L - ₹60L+',
    domainId: 'tech',
    description: 'Design algorithms that think and learn like humans.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/D3SGKyBcUjA',
    reality: {
      pressure: 'moderate',
      balance: 'flexible',
      stability: 'growing'
    },
    primaryExam: {
      name: 'GATE (CS/AI)',
      description: 'The standard path for Masters/PhD in top Indian research labs like IISc/IITs.',
      frequency: 'Annual',
      eligibility: 'Engineering Degree'
    },
    alternativeExams: [
      { name: 'TIFR GS', description: 'Entrance for Tata Institute of Fundamental Research.', frequency: 'Annual', eligibility: 'Bachelor\'s' },
      { name: 'JEST', description: 'Joint Entrance Screening Test for research fellowships.', frequency: 'Annual', eligibility: 'Bachelor\'s' }
    ],
    backupCareers: [
      { id: 'de', name: 'Data Engineer', matchReason: 'Handles the infrastructure that makes AI possible.' },
      { id: 'ml-ops', name: 'MLOps Engineer', matchReason: 'Focuses on the deployment and lifecycle of AI models.' }
    ]
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying'
];
