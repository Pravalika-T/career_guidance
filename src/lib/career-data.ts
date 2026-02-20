
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
    primaryExam: { 
      name: 'JEE Advanced', 
      description: 'Top IIT entrance.', 
      frequency: 'Annual', 
      eligibility: '12th Science',
      prepGuide: {
        subjects: [
          { name: 'Physics', weightage: '33%' },
          { name: 'Chemistry', weightage: '33%' },
          { name: 'Mathematics', weightage: '34%' }
        ],
        milestones: [
          { title: 'Foundation', period: 'Class 11', description: 'Master NCERT basics and core logic.' },
          { title: 'Advanced Concepts', period: 'Class 12 (Sem 1)', description: 'Deep dive into complex problem solving.' },
          { title: 'Mock Grinds', period: 'Last 3 Months', description: 'Solve 10+ years of previous papers.' }
        ],
        resources: ['NCERT Textbooks', 'HC Verma (Physics)', 'Cengage Series']
      }
    },
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
    primaryExam: { 
      name: 'TISS-NET', 
      description: 'Entrance for premium psychology courses.', 
      frequency: 'Annual', 
      eligibility: 'Graduation',
      prepGuide: {
        subjects: [
          { name: 'General Awareness', weightage: '40%' },
          { name: 'English Proficiency', weightage: '30%' },
          { name: 'Math & Logical Reasoning', weightage: '30%' }
        ],
        milestones: [
          { title: 'Current Affairs', period: 'Daily', description: 'Stay updated on social and political news.' },
          { title: 'Aptitude Training', period: 'Month 1-3', description: 'Build speed in logic and basic math.' },
          { title: 'Domain Knowledge', period: 'Final Month', description: 'Revise fundamental psychological theories.' }
        ],
        resources: ['The Hindu/IE', 'Arihant GK', 'RS Aggarwal']
      }
    },
    alternativeExams: [],
    backupCareers: [{ id: 'hr', name: 'HR Specialist', matchReason: 'Focuses on human behavior in organizations.' }],
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
    primaryExam: { 
      name: 'NEET UG', 
      description: 'Standard medical entrance.', 
      frequency: 'Annual', 
      eligibility: '12th Biology',
      prepGuide: {
        subjects: [
          { name: 'Biology', weightage: '50%' },
          { name: 'Physics', weightage: '25%' },
          { name: 'Chemistry', weightage: '25%' }
        ],
        milestones: [
          { title: 'NCERT Mastery', period: 'Class 11 & 12', description: 'Biology NCERT should be on your fingertips.' },
          { title: 'Conceptual Clarity', period: 'Ongoing', description: 'Understand chemical reactions and physical laws.' },
          { title: 'Speed Practice', period: 'Last 4 Months', description: 'Timed practice for 180 questions in 3 hours.' }
        ],
        resources: ['NCERT Biology', 'Trueman\'s Biology', 'OP Tandon (Chemistry)']
      }
    },
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
    primaryExam: { 
      name: 'IGRUA Entrance', 
      description: 'Top flight school entrance.', 
      frequency: 'Annual', 
      eligibility: '12th PCM',
      prepGuide: {
        subjects: [
          { name: 'English', weightage: '20%' },
          { name: 'Maths', weightage: '30%' },
          { name: 'Physics', weightage: '30%' },
          { name: 'General Awareness', weightage: '20%' }
        ],
        milestones: [
          { title: 'Physical Fitness', period: 'Initial', description: 'Ensure Class I & II medical standards.' },
          { title: 'Technical Theory', period: 'Month 1-6', description: 'Study Air Navigation and Meteorology.' },
          { title: 'Entrance Focus', period: 'Last 2 Months', description: 'Practice 12th level PCM questions.' }
        ],
        resources: ['Oxford Aviation Manuals', 'RS Aggarwal Logic', 'Current Affairs Mags']
      }
    },
    alternativeExams: [],
    backupCareers: [{ id: 'atc', name: 'Air Traffic Controller', matchReason: 'Critical aviation coordination skills.' }],
    simulation: []
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
