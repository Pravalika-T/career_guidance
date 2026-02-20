
export interface CareerPath {
  id: string;
  name: string;
  role: string;
  eligibility: string;
  skills: string[];
  salary: string;
  domainId: string;
  description: string;
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
    description: 'Transform ideas into digital realities using code.'
  },
  {
    id: 'ai-res',
    name: 'AI Researcher',
    role: 'Pushes the boundaries of machine intelligence.',
    eligibility: 'PhD or Master\'s in AI/ML.',
    skills: ['Mathematics', 'TensorFlow', 'Deep Learning'],
    salary: '$120k - $350k',
    domainId: 'tech',
    description: 'Design algorithms that think and learn like humans.'
  },
  {
    id: 'cyber',
    name: 'Cybersecurity Specialist',
    role: 'Protects systems from digital threats.',
    eligibility: 'Certifications like CISSP or Bachelor\'s in InfoSec.',
    skills: ['Networking', 'Ethical Hacking', 'Risk Management'],
    salary: '$90k - $180k',
    domainId: 'tech',
    description: 'Guard the digital borders against malicious intruders.'
  },
  {
    id: 'cardio',
    name: 'Cardiologist',
    role: 'Specializes in heart and vascular health.',
    eligibility: 'MD Degree + Residency + Fellowship.',
    skills: ['Surgery', 'Diagnosis', 'Patient Care'],
    salary: '$250k - $600k',
    domainId: 'health',
    description: 'Treat complex heart conditions and save lives.'
  },
  {
    id: 'uiux',
    name: 'UI/UX Designer',
    role: 'Designs intuitive digital interfaces.',
    eligibility: 'Portfolio + Degree in Design or Psychology.',
    skills: ['Figma', 'User Research', 'Prototyping'],
    salary: '$70k - $150k',
    domainId: 'arts',
    description: 'Craft seamless and beautiful experiences for users.'
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology'
];
