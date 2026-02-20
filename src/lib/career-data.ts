
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
  { id: 'aviation', name: 'Aviation & Logistics', icon: 'Plane', description: 'Mastering the skies.' },
  { id: 'arts', name: 'Arts & Design', icon: 'Palette', description: 'Shaping visual experiences.' },
  { id: 'business', name: 'Business', icon: 'Briefcase', description: 'Managing markets.' },
  { id: 'science', name: 'Pure Science', icon: 'Microscope', description: 'Unlocking nature.' },
  { id: 'law', name: 'Law & Policy', icon: 'Scale', description: 'Upholding justice.' },
  { id: 'eng', name: 'Engineering', icon: 'Wrench', description: 'Solving real-world problems.' },
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'swe',
    name: 'Software Engineer',
    role: 'Develops applications and systems.',
    eligibility: 'B.Tech/B.E in CS or related.',
    skills: ['Python', 'System Design', 'React'],
    salary: '₹6L - ₹45L+',
    domainId: 'tech',
    description: 'Build the software that powers the world.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/D3SGKyBcUjA',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { name: 'JEE Advanced', description: 'Top IIT entrance.', frequency: 'Annual', eligibility: '12th Science' },
    alternativeExams: [{ name: 'BITSAT', description: 'BITS Pilani entrance.', frequency: 'Annual', eligibility: '12th Science' }],
    backupCareers: [{ id: 'da', name: 'Data Analyst', matchReason: 'Strong analytical overlap.' }],
    simulation: []
  },
  {
    id: 'psychologist',
    name: 'Clinical Psychologist',
    role: 'Diagnoses and treats mental health issues.',
    eligibility: 'Masters/M.Phil in Clinical Psychology.',
    skills: ['Empathy', 'Active Listening', 'Counseling'],
    salary: '₹4L - ₹20L+',
    domainId: 'health',
    description: 'Understand the human mind and help people overcome mental barriers.',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'stable' },
    primaryExam: { name: 'TISS-NET', description: 'Entrance for premium psychology courses.', frequency: 'Annual', eligibility: 'Graduation' },
    alternativeExams: [],
    backupCareers: [{ id: 'hr', name: 'HR Specialist', matchReason: 'Focuses on human behavior in organizations.' }],
    simulation: []
  },
  {
    id: 'eee',
    name: 'Electrical Engineer (EEE)',
    role: 'Works with electrical systems and power generation.',
    eligibility: 'B.E/B.Tech in Electrical Engineering.',
    skills: ['Power Systems', 'Control Systems', 'Circuit Design'],
    salary: '₹5L - ₹30L+',
    domainId: 'eng',
    description: 'Design and manage large-scale electrical grids and power systems.',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'GATE', description: 'Standard for M.Tech and PSU jobs.', frequency: 'Annual', eligibility: 'B.Tech Final Year' },
    alternativeExams: [],
    backupCareers: [{ id: 'solar-eng', name: 'Solar Energy Consultant', matchReason: 'Leverages electrical expertise in renewables.' }],
    simulation: []
  },
  {
    id: 'ece',
    name: 'Electronics & Communication (ECE)',
    role: 'Designs electronic circuits and communication systems.',
    eligibility: 'B.E/B.Tech in ECE.',
    skills: ['VLSI', 'Signal Processing', 'Embedded Systems'],
    salary: '₹6L - ₹35L+',
    domainId: 'eng',
    description: 'The bridge between hardware and software, focusing on chips and networking.',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { name: 'GATE (ECE)', description: 'Primary technical entrance.', frequency: 'Annual', eligibility: 'B.Tech' },
    alternativeExams: [],
    backupCareers: [{ id: 'net-admin', name: 'Network Administrator', matchReason: 'Applies communication theory to IT infrastructure.' }],
    simulation: []
  },
  {
    id: 'doctor',
    name: 'General Physician',
    role: 'Provides primary medical care.',
    eligibility: 'MBBS Degree.',
    skills: ['Diagnosis', 'Pathology', 'Clinical Care'],
    salary: '₹10L - ₹60L+',
    domainId: 'health',
    description: 'The front line of healthcare, identifying and treating illnesses.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/JBty9sV7Omc',
    reality: { pressure: 'high', balance: 'demanding', stability: 'stable' },
    primaryExam: { name: 'NEET UG', description: 'Standard medical entrance.', frequency: 'Annual', eligibility: '12th Biology' },
    alternativeExams: [],
    backupCareers: [{ id: 'pharma', name: 'Pharmacologist', matchReason: 'Uses medical knowledge for drug research.' }],
    simulation: []
  },
  {
    id: 'pilot',
    name: 'Commercial Pilot',
    role: 'Operates commercial aircraft.',
    eligibility: '12th Science + CPL.',
    skills: ['Navigation', 'Aviation Safety', 'Quick Thinking'],
    salary: '₹12L - ₹85L+',
    domainId: 'aviation',
    description: 'Take command of the flight deck and navigate the global skies.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/wrtFLhwu168',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'IGRUA Entrance', description: 'Top flight school entrance.', frequency: 'Annual', eligibility: '12th PCM' },
    alternativeExams: [],
    backupCareers: [{ id: 'atc', name: 'Air Traffic Controller', matchReason: 'Critical aviation coordination skills.' }],
    simulation: []
  },
  {
    id: 'singer',
    name: 'Professional Singer',
    role: 'Performs and records music.',
    eligibility: 'Musical training/Certification.',
    skills: ['Vocal Control', 'Stage Presence', 'Recording'],
    salary: '₹3L - ₹50L+',
    domainId: 'arts',
    description: 'Express emotions and stories through vocal performance.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/2vS_6-A0GTo',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'variable' },
    primaryExam: { name: 'Trinity Vocals', description: 'Global certification.', frequency: 'Bi-Annual', eligibility: 'Open' },
    alternativeExams: [],
    backupCareers: [{ id: 'edu-music', name: 'Music Teacher', matchReason: 'Teaching vocal techniques.' }],
    simulation: []
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
