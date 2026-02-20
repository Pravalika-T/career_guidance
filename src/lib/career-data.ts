
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
    id: 'ai-res',
    name: 'AI Researcher',
    role: 'Pushes the boundaries of artificial intelligence.',
    eligibility: 'PhD or Master\'s in AI/ML.',
    skills: ['Deep Learning', 'PyTorch', 'Mathematics'],
    salary: '₹12L - ₹60L+',
    domainId: 'tech',
    description: 'Design the algorithms that will shape the next era of computing.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/D3SGKyBcUjA',
    reality: {
      pressure: 'high',
      balance: 'flexible',
      stability: 'growing'
    },
    primaryExam: {
      name: 'GATE (CS)',
      description: 'Entrance for Master\'s and PhD programs in top Indian institutes.',
      frequency: 'Annual',
      eligibility: 'Bachelor\'s Degree'
    },
    alternativeExams: [
      { name: 'IIIT-H / ISI Entrance', description: 'Specialized research entrances.', frequency: 'Annual', eligibility: 'Bachelor\'s' }
    ],
    backupCareers: [
      { id: 'ml-eng', name: 'ML Engineer', matchReason: 'Translates AI research into production models.' },
      { id: 'stats', name: 'Statistician', matchReason: 'Deep focus on data modeling and analysis.' }
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
    id: 'nurse',
    name: 'Nurse Practitioner',
    role: 'Advanced nursing care and patient management.',
    eligibility: 'B.Sc. Nursing + Specialized Certification.',
    skills: ['Patient Care', 'Emergency Response', 'Clinical Monitoring'],
    salary: '₹4L - ₹15L+',
    domainId: 'health',
    description: 'Provide essential, high-quality healthcare at the bedside and beyond.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/JBty9sV7Omc',
    reality: {
      pressure: 'high',
      balance: 'structured',
      stability: 'stable'
    },
    primaryExam: {
      name: 'AIIMS Nursing Entrance',
      description: 'Premier entrance for nursing education in India.',
      frequency: 'Annual',
      eligibility: 'High School (PCB)'
    },
    alternativeExams: [
      { name: 'JIPMER B.Sc. Entrance', description: 'Specialized healthcare entrance.', frequency: 'Annual', eligibility: 'High School' }
    ],
    backupCareers: [
      { id: 'health-admin', name: 'Hospital Administrator', matchReason: 'Managing the operations of healthcare facilities.' }
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
    id: 'singer',
    name: 'Professional Singer',
    role: 'Vocal performer for studio recordings and live shows.',
    eligibility: 'Training in Classical or Contemporary Music.',
    skills: ['Vocal Control', 'Performance', 'Composition'],
    salary: '₹3L - ₹50L+ (Project-based)',
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
      { name: 'Reality Show Auditions', description: 'Direct platform for mass exposure and talent discovery.', frequency: 'Annual', eligibility: 'Talent-based' },
      { name: 'Private Academy Programs', description: 'Specialized vocal training from recognized music gurus.', frequency: 'Ongoing', eligibility: 'Open' }
    ],
    backupCareers: [
      { id: 'music-teacher', name: 'Music Educator', matchReason: 'Pass on your skills to the next generation in schools or private setups.' },
      { id: 'sound-eng', name: 'Sound Engineer', matchReason: 'Work with the technical side of recording and audio production.' },
      { id: 'voice-artist', name: 'Voice Over Artist', matchReason: 'Use your vocal versatility for ads, movies, and animations.' }
    ]
  },
  {
    id: 'dancer',
    name: 'Professional Dancer',
    role: 'Performs in films, theatre, or live stage productions.',
    eligibility: 'Training in specific dance forms (Classical/Hip-Hop/Contemporary).',
    skills: ['Rhythm', 'Flexibility', 'Stage Presence'],
    salary: '₹3L - ₹20L+',
    domainId: 'arts',
    description: 'Tell stories through movement and rhythmic expression.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/7V-6yY2f4Y0',
    reality: {
      pressure: 'high',
      balance: 'demanding',
      stability: 'variable'
    },
    primaryExam: {
      name: 'Bachelors in Performing Arts (BPA)',
      description: 'Formal degree specializing in Dance from top universities.',
      frequency: 'Annual',
      eligibility: '10+2'
    },
    alternativeExams: [
      { name: 'Dance Academy Certifications', description: 'Intensive short-term professional programs.', frequency: 'Ongoing', eligibility: 'Audition-based' },
      { name: 'International Workshops', description: 'Gaining global exposure and networking with choreographers.', frequency: 'Ongoing', eligibility: 'Open' }
    ],
    backupCareers: [
      { id: 'choreographer', name: 'Choreographer', matchReason: 'Transition to creating and directing dance sequences for others.' },
      { id: 'fitness-instr', name: 'Dance Fitness Instructor', matchReason: 'Use dance for health and wellness programs like Zumba.' },
      { id: 'event-coord', name: 'Event Coordinator', matchReason: 'Plan and manage stage shows and cultural festivals.' }
    ]
  },
  {
    id: 'accountant',
    name: 'Chartered Accountant',
    role: 'Expert in auditing, taxation, and financial accounting.',
    eligibility: 'Cleared all levels of CA examination by ICAI.',
    skills: ['Audit', 'Financial Analysis', 'Tax Laws'],
    salary: '₹7L - ₹40L+',
    domainId: 'business',
    description: 'Ensure financial integrity and strategic growth for organizations.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/nU-Y2Ff-V6Y',
    reality: {
      pressure: 'high',
      balance: 'structured',
      stability: 'stable'
    },
    primaryExam: {
      name: 'CA Foundation / Inter / Final',
      description: 'The rigorous 3-level path conducted by the ICAI.',
      frequency: 'Bi-Annual',
      eligibility: '10+2 for Foundation'
    },
    alternativeExams: [
      { name: 'ACCA (Global)', description: 'International recognition in finance and accounting.', frequency: 'Quarterly', eligibility: '10+2' },
      { name: 'CMA', description: 'Focus on management accounting and cost strategy.', frequency: 'Annual', eligibility: 'Bachelor\'s' }
    ],
    backupCareers: [
      { id: 'fin-analyst', name: 'Financial Analyst', matchReason: 'Analyzes market trends and financial data for investment.' },
      { id: 'tax-consult', name: 'Tax Consultant', matchReason: 'Specializes in advisory services for tax planning.' }
    ]
  },
  {
    id: 'teacher',
    name: 'School Teacher',
    role: 'Educates students in specific subjects at primary/secondary levels.',
    eligibility: 'Bachelor\'s + B.Ed + TET Certification.',
    skills: ['Patience', 'Subject Knowledge', 'Communication'],
    salary: '₹3L - ₹12L+',
    domainId: 'edu',
    description: 'Shape the minds and characters of the future generation.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/nU-Y2Ff-V6Y',
    reality: {
      pressure: 'moderate',
      balance: 'structured',
      stability: 'stable'
    },
    primaryExam: {
      name: 'CTET / State TET',
      description: 'The mandatory qualifying exam for teaching in government schools.',
      frequency: 'Annual',
      eligibility: 'B.Ed / D.El.Ed'
    },
    alternativeExams: [
      { name: 'B.Ed Entrance Exams', description: 'Gateways to premier teacher training colleges.', frequency: 'Annual', eligibility: 'Bachelor\'s' },
      { name: 'Private School Panels', description: 'Direct interviews for prestigious private educational institutions.', frequency: 'Ongoing', eligibility: 'B.Ed' }
    ],
    backupCareers: [
      { id: 'corp-trainer', name: 'Corporate Trainer', matchReason: 'Training adults in professional skills and soft skills.' },
      { id: 'content-dev', name: 'EdTech Content Developer', matchReason: 'Create educational materials for digital learning platforms.' }
    ]
  },
  {
    id: 'designer',
    name: 'Graphic Designer',
    role: 'Creates visual concepts for branding and media.',
    eligibility: 'Degree/Diploma in Design.',
    skills: ['Photoshop', 'Typography', 'Branding'],
    salary: '₹4L - ₹18L+',
    domainId: 'arts',
    description: 'Communicate ideas through visual storytelling and digital art.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/u_v_L07e59k',
    reality: {
      pressure: 'moderate',
      balance: 'flexible',
      stability: 'growing'
    },
    primaryExam: {
      name: 'NID DAT / UCEED',
      description: 'Entrance for India\'s top design institutes like NID and IITs.',
      frequency: 'Annual',
      eligibility: '10+2'
    },
    alternativeExams: [
      { name: 'NIFT Entrance', description: 'Specialized in fashion and textile design.', frequency: 'Annual', eligibility: '10+2' },
      { name: 'Portfolio Review', description: 'Direct entry into creative agencies based on design work.', frequency: 'Ongoing', eligibility: 'Open' }
    ],
    backupCareers: [
      { id: 'ui-ux', name: 'UI/UX Designer', matchReason: 'Focuses on user experience and digital interface design.' },
      { id: 'art-dir', name: 'Assistant Art Director', matchReason: 'Manages visual styles for films or advertising campaigns.' }
    ]
  },
  {
    id: 'ui-ux',
    name: 'Product Designer',
    role: 'Designs user interfaces and product experiences.',
    eligibility: 'Bachelor\'s in Design or relevant certification.',
    skills: ['Figma', 'User Research', 'Prototyping'],
    salary: '₹8L - ₹30L+',
    domainId: 'tech',
    description: 'Blend psychology and art to build digital products people love.',
    virtualExperienceUrl: 'https://www.youtube.com/embed/u_v_L07e59k',
    reality: {
      pressure: 'moderate',
      balance: 'flexible',
      stability: 'growing'
    },
    primaryExam: {
      name: 'UCEED',
      description: 'Undergraduate Common Entrance Examination for Design.',
      frequency: 'Annual',
      eligibility: '10+2'
    },
    alternativeExams: [
      { name: 'NID Entrance', description: 'National Institute of Design entrance.', frequency: 'Annual', eligibility: '10+2' }
    ],
    backupCareers: [
      { id: 'gd', name: 'Graphic Designer', matchReason: 'Foundational visual communication skills.' }
    ]
  }
];

export const INTERESTS = [
  'Coding', 'Helping People', 'Solving Puzzles', 'Drawing', 'Gaming', 
  'Nature', 'Public Speaking', 'Math', 'Writing', 'Robotics', 'Space',
  'Music', 'Photography', 'Management', 'Law', 'Biology', 'Flying', 'Dancing', 'Teaching', 'Finance'
];
