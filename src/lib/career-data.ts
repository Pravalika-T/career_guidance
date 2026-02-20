
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
    salary: '$80k - $200k',
    domainId: 'tech',
    description: 'Transform ideas into digital realities using code.',
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
    eligibility: 'MD Degree + Residency.',
    skills: ['Surgery', 'Diagnosis', 'Patient Care'],
    salary: '$250k - $600k',
    domainId: 'health',
    description: 'Treat complex heart conditions and save lives.',
    primaryExam: {
      name: 'NEET UG',
      description: 'The primary gateway to medical school (MBBS).',
      frequency: 'Annual',
      eligibility: 'High School (Biology Stream)'
    },
    alternativeExams: [
      { name: 'State Medical Entrances', description: 'Alternative state-level government medical seats.', frequency: 'Annual', eligibility: 'High School' },
      { name: 'Private Univ Tests', description: 'Specific exams for renowned private medical colleges.', frequency: 'Annual', eligibility: 'High School' }
    ],
    backupCareers: [
      { id: 'physio', name: 'Physiotherapist', matchReason: 'Allows you to heal and help patients through movement.' },
      { id: 'bio-sci', name: 'Biomedical Scientist', matchReason: 'Focuses on the science behind healthcare and lab research.' },
      { id: 'nursing', name: 'Nursing Specialist', matchReason: 'Critical frontline healthcare and direct patient interaction.' }
    ]
  },
  {
    id: 'ai-res',
    name: 'AI Researcher',
    role: 'Pushes the boundaries of machine intelligence.',
    eligibility: 'PhD or Master\'s in AI/ML.',
    skills: ['Mathematics', 'TensorFlow', 'Deep Learning'],
    salary: '$120k - $350k',
    domainId: 'tech',
    description: 'Design algorithms that think and learn like humans.',
    primaryExam: {
      name: 'GATE (CS/AI)',
      description: 'The standard path for Masters/PhD in top Research Labs.',
      frequency: 'Annual',
      eligibility: 'Engineering Degree'
    },
    alternativeExams: [
      { name: 'University Specific Tests', description: 'Research-focused entrances for specialized AI labs.', frequency: 'Annual', eligibility: 'Bachelor\'s' }
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
  'Music', 'Photography', 'Management', 'Law', 'Biology'
];
