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
    description: 'Build the software that powers the world.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/D3SGKyBcUjA',
    vrExperience: {
      scenes: [
        {
          id: 'environment',
          title: 'The Tech Studio',
          description: 'Explore your creative workstation and collaborative zones.',
          hotspots: [
            { id: '1', label: 'Workstation', info: 'Dual-monitors and ergonomic setup.', x: 40, y: 50 }
          ]
        },
        { id: 'responsibilities', title: 'Coding Flow', description: 'Experience building systems.', hotspots: [] },
        { id: 'lifestyle', title: 'Agile Rhythm', description: 'Mix of quiet work and team syncs.', hotspots: [] }
      ]
    },
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { 
      name: 'JEE Advanced', 
      description: 'Top IIT entrance.', 
      frequency: 'Annual', 
      eligibility: '12th Science',
      prepGuide: {
        subjects: [{ name: 'Physics', weightage: '33%' }, { name: 'Chemistry', weightage: '33%' }, { name: 'Math', weightage: '34%' }],
        milestones: [{ title: 'Foundation', period: 'Class 11', description: 'Master core logic.' }],
        resources: ['NCERT', 'HC Verma']
      }
    },
    alternativeExams: [{ name: 'BITSAT', description: 'BITS Pilani entrance.', frequency: 'Annual', eligibility: '12th Science' }],
    backupCareers: [{ id: 'da', name: 'Data Analyst', matchReason: 'Strong analytical overlap.' }],
    simulation: []
  },
  {
    id: 'ece',
    name: 'Electronics Engineer',
    role: 'Designs electronic circuits and systems.',
    eligibility: 'B.Tech in ECE.',
    skills: ['Circuit Design', 'VLSI', 'Embedded Systems'],
    salary: '₹5L - ₹35L+',
    domainId: 'eng',
    description: 'Create the hardware foundations of modern communication.',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'GATE', description: 'National level engineering test.', frequency: 'Annual', eligibility: 'Final year B.Tech' },
    alternativeExams: [],
    backupCareers: [{ id: 'iot', name: 'IoT Specialist', matchReason: 'Hardware-software hybrid.' }],
    simulation: []
  },
  {
    id: 'eee',
    name: 'Electrical Engineer',
    role: 'Works with power generation and distribution.',
    eligibility: 'B.Tech in Electrical Eng.',
    skills: ['Power Systems', 'Control Systems', 'Renewables'],
    salary: '₹4L - ₹30L+',
    domainId: 'eng',
    description: 'Power the cities and industries of tomorrow.',
    reality: { pressure: 'moderate', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'JEE Main', description: 'Common engineering entrance.', frequency: 'Twice Yearly', eligibility: '12th Science' },
    alternativeExams: [],
    backupCareers: [{ id: 're', name: 'Solar Consultant', matchReason: 'Focus on green energy.' }],
    simulation: []
  },
  {
    id: 'doctor',
    name: 'General Physician',
    role: 'Provides primary medical care.',
    eligibility: 'MBBS Degree.',
    skills: ['Diagnosis', 'Pathology', 'Empathy'],
    salary: '₹10L - ₹60L+',
    domainId: 'health',
    description: 'The front line of healthcare, saving lives daily.',
    reality: { pressure: 'high', balance: 'demanding', stability: 'stable' },
    primaryExam: { 
      name: 'NEET UG', 
      description: 'Standard medical entrance.', 
      frequency: 'Annual', 
      eligibility: '12th Biology',
      prepGuide: {
        subjects: [{ name: 'Biology', weightage: '50%' }, { name: 'Physics', weightage: '25%' }, { name: 'Chemistry', weightage: '25%' }],
        milestones: [{ title: 'NCERT Mastery', period: 'Class 11-12', description: 'Biology NCERT is key.' }],
        resources: ['NCERT Bio', 'Trueman\'s']
      }
    },
    alternativeExams: [],
    backupCareers: [{ id: 'pharma', name: 'Pharmacologist', matchReason: 'Medical research focus.' }],
    simulation: []
  },
  {
    id: 'psychologist',
    name: 'Clinical Psychologist',
    role: 'Helps people manage mental health.',
    eligibility: 'MA/M.Sc in Psychology + M.Phil.',
    skills: ['Counseling', 'Behavioral Therapy', 'Active Listening'],
    salary: '₹3L - ₹15L+',
    domainId: 'health',
    description: 'Guide people through their mental and emotional journeys.',
    reality: { pressure: 'moderate', balance: 'flexible', stability: 'growing' },
    primaryExam: { name: 'CUET PG', description: 'Entrance for MA programs.', frequency: 'Annual', eligibility: 'Bachelors' },
    alternativeExams: [],
    backupCareers: [{ id: 'hr', name: 'HR Manager', matchReason: 'People-centric skills.' }],
    simulation: []
  },
  {
    id: 'pilot',
    name: 'Commercial Pilot',
    role: 'Operates commercial aircraft.',
    eligibility: '12th Science + CPL.',
    skills: ['Navigation', 'Aviation Safety', 'Meteorology'],
    salary: '₹12L - ₹85L+',
    domainId: 'aviation',
    description: 'Take command of the flight deck and navigate the skies.',
    reality: { pressure: 'high', balance: 'structured', stability: 'stable' },
    primaryExam: { name: 'IGRUA Entrance', description: 'Premier flight academy test.', frequency: 'Annual', eligibility: '12th Science' },
    alternativeExams: [],
    backupCareers: [{ id: 'atc', name: 'ATC', matchReason: 'Aviation coordination.' }],
    simulation: []
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
