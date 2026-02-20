export interface Exam {
  name: string;
  description: string;
  frequency: string;
  eligibility: string;
  prepGuide?: PrepGuideData;
}

export interface PrepGuideData {
  subjects: { name: string; weightage: string }[];
  milestones: { title: string; period: string; description: string }[];
  resources: string[];
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

export interface VRHotspot {
  id: string;
  label: string;
  info: string;
  x: number;
  y: number;
}

export interface VRExperienceData {
  scenes: {
    id: 'environment' | 'responsibilities' | 'lifestyle';
    title: string;
    description: string;
    hotspots: VRHotspot[];
  }[];
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
  vrExperience?: VRExperienceData;
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
  { id: 'aviation', name: 'Aviation', icon: 'Plane', description: 'Mastering the skies.' },
  { id: 'arts', name: 'Arts & Design', icon: 'Palette', description: 'Shaping visual experiences.' },
  { id: 'business', name: 'Business', icon: 'Briefcase', description: 'Managing markets.' },
  { id: 'science', name: 'Science', icon: 'Microscope', description: 'Unlocking nature.' },
  { id: 'law', name: 'Law', icon: 'Scale', description: 'Upholding justice.' },
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
    description: 'Build the software that powers the world through code.',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { 
      name: 'JEE Advanced', 
      description: 'The premier entrance for IITs.', 
      frequency: 'Annual', 
      eligibility: '12th Science',
      prepGuide: {
        subjects: [{ name: 'Physics', weightage: '33%' }, { name: 'Chemistry', weightage: '33%' }, { name: 'Math', weightage: '34%' }],
        milestones: [{ title: 'Concept Building', period: 'Class 11', description: 'Deep dive into mechanics and calculus.' }],
        resources: ['NCERT', 'Irodov', 'Cengage']
      }
    },
    alternativeExams: [{ name: 'BITSAT', description: 'Entrance for BITS Pilani.', frequency: 'Annual', eligibility: '12th Science' }],
    backupCareers: [{ id: 'da', name: 'Data Analyst', matchReason: 'Analytical skills transfer perfectly.' }],
    simulation: []
  },
  {
    id: 'ds',
    name: 'Data Scientist',
    role: 'Analyzes data to find patterns.',
    eligibility: 'Degree in Math, Stats, or CS.',
    skills: ['Machine Learning', 'Statistics', 'R/Python'],
    salary: '₹8L - ₹50L+',
    domainId: 'tech',
    description: 'Turn raw data into strategic insights using AI.',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { name: 'CUET UG', description: 'Entrance for top central universities.', frequency: 'Annual', eligibility: '12th Grade' },
    alternativeExams: [],
    backupCareers: [{ id: 'ba', name: 'Business Analyst', matchReason: 'Domain knowledge overlap.' }],
    simulation: []
  },
  {
    id: 'doctor',
    name: 'General Physician',
    role: 'Primary healthcare provider.',
    eligibility: 'MBBS Degree.',
    skills: ['Diagnosis', 'Pathology', 'Empathy'],
    salary: '₹10L - ₹60L+',
    domainId: 'health',
    description: 'The guardian of public health and wellbeing.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'stable' },
    primaryExam: { 
      name: 'NEET UG', 
      description: 'National Eligibility cum Entrance Test.', 
      frequency: 'Annual', 
      eligibility: '12th Biology',
      prepGuide: {
        subjects: [{ name: 'Biology', weightage: '50%' }, { name: 'Physics', weightage: '25%' }, { name: 'Chemistry', weightage: '25%' }],
        milestones: [{ title: 'NCERT Focus', period: '12 Months', description: 'Master every line of Biology NCERT.' }],
        resources: ['NCERT Bio', 'MTG Fingertips']
      }
    },
    alternativeExams: [],
    backupCareers: [{ id: 'research', name: 'Medical Researcher', matchReason: 'Deep scientific background.' }],
    simulation: []
  },
  {
    id: 'architect',
    name: 'Architect',
    role: 'Designs buildings and structures.',
    eligibility: 'B.Arch Degree.',
    skills: ['AutoCAD', 'Design Thinking', 'Sketching'],
    salary: '₹4L - ₹25L+',
    domainId: 'arts',
    description: 'Merge art and engineering to shape the skyline.',
    reality: { pressure: 'moderate', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'NATA', description: 'National Aptitude Test in Architecture.', frequency: 'Annual', eligibility: '12th Grade' },
    alternativeExams: [{ name: 'JEE Paper 2', description: 'Architecture entrance for NITs.', frequency: 'Annual', eligibility: '12th Science' }],
    backupCareers: [{ id: 'id', name: 'Interior Designer', matchReason: 'Spatial design core.' }],
    simulation: []
  },
  {
    id: 'lawyer',
    name: 'Corporate Lawyer',
    role: 'Advises companies on legal matters.',
    eligibility: 'LLB or Integrated LLM.',
    skills: ['Research', 'Negotiation', 'Ethics'],
    salary: '₹12L - ₹70L+',
    domainId: 'law',
    description: 'Navigate the complex legal frameworks of global business.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'stable' },
    primaryExam: { name: 'CLAT', description: 'Common Law Admission Test.', frequency: 'Annual', eligibility: '12th Grade' },
    alternativeExams: [{ name: 'AILET', description: 'NLU Delhi entrance.', frequency: 'Annual', eligibility: '12th Grade' }],
    backupCareers: [{ id: 'cs', name: 'Company Secretary', matchReason: 'Compliance and legal focus.' }],
    simulation: []
  },
  {
    id: 'pilot',
    name: 'Commercial Pilot',
    role: 'Flies commercial aircraft.',
    eligibility: '12th Science + CPL.',
    skills: ['Navigation', 'Discipline', 'Physics'],
    salary: '₹15L - ₹90L+',
    domainId: 'aviation',
    description: 'Master flight dynamics and explore the world from the sky.',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'DGCA Exams', description: 'Theoretical exams for pilot licensing.', frequency: 'Quarterly', eligibility: '12th Science' },
    alternativeExams: [],
    backupCareers: [{ id: 'ops', name: 'Flight Operations', matchReason: 'Aviation ecosystem knowledge.' }],
    simulation: []
  },
  {
    id: 'chef',
    name: 'Executive Chef',
    role: 'Manages professional kitchens.',
    eligibility: 'Degree in Hotel Management.',
    skills: ['Culinary Arts', 'Leadership', 'Creativity'],
    salary: '₹3L - ₹20L+',
    domainId: 'arts',
    description: 'Combine passion and precision to create world-class cuisine.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'variable' },
    primaryExam: { name: 'NCHMCT JEE', description: 'Hotel Management entrance.', frequency: 'Annual', eligibility: '12th Grade' },
    alternativeExams: [],
    backupCareers: [{ id: 'fnb', name: 'F&B Manager', matchReason: 'Hospitality management core.' }],
    simulation: []
  },
  {
    id: 'ece',
    name: 'Electronics Engineer',
    role: 'Designs hardware circuits.',
    eligibility: 'B.Tech in ECE.',
    skills: ['Circuit Design', 'IoT', 'Robotics'],
    salary: '₹5L - ₹35L+',
    domainId: 'eng',
    description: 'Develop the chips and circuits that power the future.',
    reality: { pressure: 'moderate', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'JEE Main', description: 'Standard engineering entrance.', frequency: 'Twice Annual', eligibility: '12th Science' },
    alternativeExams: [],
    backupCareers: [{ id: 'embedded', name: 'Embedded Systems Dev', matchReason: 'Hardware-software hybrid.' }],
    simulation: []
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Cooking', 'Law', 'Biology', 'Flying', 'Designing Buildings', 'Teaching', 'Money'
];
