// Enhanced Database of Careers with Exams and Education
export interface Career {
  id: string;
  title: string;
  description: string;
  matchScore?: number;
  tags: string[];
  stream: string[];
  salary: string;
  growth: string;
  stressLevel: "Low" | "Medium" | "High";
  workEnvironment: string;
  roadmap: string[];
  skills: string[];
  tools: string[];
  exams: string[]; // New Field
  education: {     // New Field
    ug: string;
    pg?: string;
  };
}

export const CAREERS: Career[] = [
  // --- TECHNOLOGY / SCIENCE (MATH) ---
  {
    id: "frontend-dev",
    title: "Frontend Engineer",
    description: "Architect the user-facing side of web applications. You bridge the gap between design and technical implementation.",
    tags: ["Web Development", "Visual Design", "Coding", "Tech"],
    stream: ["Science (Math)", "Technology", "Arts & Humanities"],
    salary: "$75k - $160k",
    growth: "High (15% / year)",
    stressLevel: "Medium",
    workEnvironment: "Highly Remote-Friendly, Collaborative",
    roadmap: [
      "Master HTML5, CSS3, and Modern JavaScript (ES6+)",
      "Deep dive into React ecosystem (Hooks, Context, Redux)",
      "Learn CSS Frameworks (Tailwind) & Animation (Framer Motion)",
      "Understand Web Performance & Accessibility (a11y)",
      "Build a polished portfolio with 3 complex projects"
    ],
    skills: ["React/Vue", "TypeScript", "Responsive Design", "Web Performance"],
    tools: ["VS Code", "Figma", "Git/GitHub", "Chrome DevTools"],
    exams: ["None (Portfolio based)", "AWS Certified Developer (Optional)"],
    education: {
      ug: "B.Tech / BCA / B.Sc CS",
      pg: "MCA / M.Tech (Optional)"
    }
  },
  {
    id: "backend-dev",
    title: "Backend Engineer",
    description: "Build the logic, databases, and APIs that power the web. Focus on performance, security, and scalability.",
    tags: ["Web Development", "Logic", "Systems", "Coding", "Database", "Cloud Computing"],
    stream: ["Science (Math)", "Technology"],
    salary: "$85k - $170k",
    growth: "High (18% / year)",
    stressLevel: "Medium",
    workEnvironment: "Remote-Friendly, Logic-Focused",
    roadmap: [
      "Learn a server-side language (Node.js, Python, or Go)",
      "Master Database Design (SQL vs NoSQL)",
      "Understand API Architecture (REST & GraphQL)",
      "Learn Authentication & Security Best Practices",
      "Explore Cloud Infrastructure (AWS/Docker)"
    ],
    skills: ["Node.js/Python", "SQL/PostgreSQL", "API Design", "System Architecture"],
    tools: ["Docker", "Postman", "AWS", "Redis"],
    exams: ["AWS Solutions Architect", "Oracle Certified Professional"],
    education: {
      ug: "B.Tech (CS/IT)",
      pg: "M.Tech (CS) (Optional)"
    }
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Turn raw data into meaningful insights using statistics and machine learning. Predict the future with math.",
    tags: ["Data Science", "Math", "Logic", "Python", "Research", "Artificial Intelligence"],
    stream: ["Science (Math)", "Commerce"],
    salary: "$100k - $190k",
    growth: "Explosive (25% / year)",
    stressLevel: "Medium",
    workEnvironment: "Corporate, Research Labs, Tech Companies",
    roadmap: [
      "Master Python & Data Libraries (Pandas, NumPy)",
      "Deep dive into Statistics & Probability",
      "Learn Data Visualization (Matplotlib/Seaborn)",
      "Master Machine Learning Algorithms (Scikit-Learn)",
      "Work on Kaggle Competitions"
    ],
    skills: ["Python", "Statistics", "Machine Learning", "Data Storytelling"],
    tools: ["Jupyter Notebooks", "TensorFlow", "Tableau", "SQL"],
    exams: ["Google Data Analytics Cert", "Microsoft Certified: Azure Data Scientist"],
    education: {
      ug: "B.Tech / B.Sc (Math/Stats)",
      pg: "M.Sc Data Science / MBA (Business Analytics)"
    }
  },
  {
    id: "ai-engineer",
    title: "AI / ML Engineer",
    description: "Design and deploy intelligent systems that can learn and adapt. The frontier of modern technology.",
    tags: ["Artificial Intelligence", "Math", "Coding", "Innovation", "Tech", "Data Science"],
    stream: ["Science (Math)", "Technology"],
    salary: "$120k - $220k",
    growth: "Explosive (35% / year)",
    stressLevel: "High",
    workEnvironment: "Tech Giants, AI Startups, Research",
    roadmap: [
      "Strong foundation in Linear Algebra & Calculus",
      "Master Python & Deep Learning Frameworks",
      "Understand Neural Networks & NLP",
      "Learn MLOps (Deploying models)",
      "Read Research Papers & Implement them"
    ],
    skills: ["Deep Learning", "NLP", "Computer Vision", "Python"],
    tools: ["PyTorch", "TensorFlow", "Hugging Face", "CUDA"],
    exams: ["TensorFlow Developer Certificate", "AWS Certified Machine Learning"],
    education: {
      ug: "B.Tech (CS/AI)",
      pg: "MS/M.Tech in AI/ML"
    }
  },
  {
    id: "doctor",
    title: "Medical Doctor (MBBS/MD)",
    description: "Diagnose and treat illnesses. A path of high responsibility, lifelong learning, and direct social impact.",
    tags: ["Medical", "Helping People", "Biology", "Science", "High Pressure"],
    stream: ["Science (Bio)"],
    salary: "$150k - $300k+",
    growth: "Steady (7% / year)",
    stressLevel: "High",
    workEnvironment: "Hospitals, Clinics, Irregular Hours",
    roadmap: [
      "Complete Pre-Med / Science Stream (PCB)",
      "Clear Entrance Exams (NEET/MCAT)",
      "Complete MBBS/MD Degree (5+ years)",
      "Complete Internship & Residency",
      "Obtain Medical License & Specialization"
    ],
    skills: ["Diagnosis", "Patient Care", "Anatomy", "Critical Thinking"],
    tools: ["Stethoscope", "EMR Systems", "Medical Imaging", "Scalpel"],
    exams: ["NEET (UG/PG)", "USMLE (USA)", "PLAB (UK)"],
    education: {
      ug: "MBBS",
      pg: "MD / MS / DNB"
    }
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant (CA)",
    description: "The gold standard of finance. Manage audits, taxation, and financial strategy for businesses.",
    tags: ["Accounting", "Math", "Logic", "Business", "Law", "Finance"],
    stream: ["Commerce"],
    salary: "$80k - $200k",
    growth: "Steady (8% / year)",
    stressLevel: "High",
    workEnvironment: "Corporate Offices, Firms, Client Sites",
    roadmap: [
      "Register for CA Foundation Course",
      "Clear Intermediate Exams",
      "Complete Articleship (3 years practical training)",
      "Clear CA Final Exams",
      "Join a Big 4 firm or start practice"
    ],
    skills: ["Auditing", "Taxation", "Financial Reporting", "Corporate Law"],
    tools: ["Excel", "SAP", "Tally", "Audit Tools"],
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
    education: {
      ug: "B.Com (Usually pursued alongside)",
      pg: "CA Certification (Equivalent to PG)"
    }
  },
  {
    id: "ux-designer",
    title: "Product (UX) Designer",
    description: "Design the way products work and feel. You advocate for the user's needs within the development process.",
    tags: ["UI/UX Design", "Psychology", "Empathy", "Creativity", "Tech"],
    stream: ["Arts & Humanities", "Technology", "Science (Math)"],
    salary: "$75k - $140k",
    growth: "Steady (12% / year)",
    stressLevel: "Low",
    workEnvironment: "Collaborative, Studio or Tech Office",
    roadmap: [
      "Learn Design Thinking & User-Centered Design",
      "Master Figma & Prototyping",
      "Conduct User Research & Usability Testing",
      "Understand Design Systems",
      "Create a Case Study Portfolio"
    ],
    skills: ["Wireframing", "Prototyping", "User Research", "Interaction Design"],
    tools: ["Figma", "Adobe XD", "Maze", "Notion"],
    exams: ["Google UX Design Certificate (Optional)", "NID/UCEED (India)"],
    education: {
      ug: "B.Des / B.F.A",
      pg: "M.Des (Optional)"
    }
  },
  {
    id: "lawyer",
    title: "Corporate Lawyer",
    description: "Advise businesses on their legal rights and obligations. Requires sharp logic and excellent command over language.",
    tags: ["Law", "Logic", "Reading", "Communication", "Strategy"],
    stream: ["Arts & Humanities", "Commerce"],
    salary: "$90k - $250k",
    growth: "Steady (6% / year)",
    stressLevel: "High",
    workEnvironment: "Law Firms, Corporate Legal Depts, Courts",
    roadmap: [
      "Bachelor's in Law (LLB/JD)",
      "Pass the Bar Exam",
      "Specialize in Corporate/IP/Criminal Law",
      "Internships at Law Firms",
      "Develop strong negotiation skills"
    ],
    skills: ["Legal Writing", "Negotiation", "Research", "Public Speaking"],
    tools: ["Legal Databases", "Case Management Software", "MS Word", "Dictaphone"],
    exams: ["CLAT", "LSAT", "Bar Exam"],
    education: {
      ug: "LLB / BA LLB",
      pg: "LLM (Optional)"
    }
  }
];

export const INTEREST_CATEGORIES = [
  {
    id: "tech",
    label: "Technology & Code",
    icon: "Code",
    description: "Building the digital future.",
    recommendedStreams: ["Science (Math)", "Technology"],
    subOptions: [
      "Web Development",
      "Mobile Apps",
      "Artificial Intelligence",
      "Cybersecurity",
      "Cloud Computing",
      "Game Development",
      "DevOps",
      "Data Science",
      "Blockchain",
      "IoT Development",
      "AR/VR Development",
      "Robotics",
      "Quantum Computing"
    ]
  },
  {
    id: "business",
    label: "Business & Finance",
    icon: "Briefcase",
    description: "Strategy, money, and markets.",
    recommendedStreams: ["Commerce", "Science (Math)"],
    subOptions: [
      "Investment Banking",
      "Digital Marketing",
      "Entrepreneurship",
      "Management",
      "Accounting",
      "Finance",
      "Business Analytics",
      "E-commerce",
      "Product Management",
      "Consulting",
      "Real Estate",
      "Supply Chain Management"
    ]
  },
  {
    id: "creative",
    label: "Creative & Design",
    icon: "Palette",
    description: "Visuals, user experience, and art.",
    recommendedStreams: ["Arts & Humanities", "Technology"],
    subOptions: [
      "UI/UX Design",
      "Visual Design",
      "Content Creation",
      "Animation",
      "Architecture",
      "Fashion Design",
      "Interior Design",
      "Photography",
      "Video Production",
      "Brand Strategy",
      "Motion Graphics",
      "Industrial Design"
    ]
  },
  {
    id: "science",
    label: "Science & Healthcare",
    icon: "FlaskConical",
    description: "Healing, researching, and discovering.",
    recommendedStreams: ["Science (Bio)", "Science (Math)"],
    subOptions: [
      "Medical",
      "Biotechnology",
      "Psychology",
      "Environmental Science",
      "Research",
      "Pharmacy",
      "Nursing",
      "Genetics",
      "Neuroscience",
      "Public Health",
      "Veterinary Science",
      "Nutrition"
    ]
  },
  {
    id: "law",
    label: "Law & Humanities",
    icon: "Scale",
    description: "Justice, society, and policy.",
    recommendedStreams: ["Arts & Humanities", "Commerce"],
    subOptions: [
      "Law",
      "Policy Making",
      "Social Work",
      "Journalism",
      "International Relations",
      "Political Science",
      "Human Rights",
      "Education",
      "Philosophy",
      "History",
      "Linguistics"
    ]
  },
  {
    id: "engineering",
    label: "Engineering & Manufacturing",
    icon: "Cog",
    description: "Building and innovating physical systems.",
    recommendedStreams: ["Science (Math)", "Technology"],
    subOptions: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Aerospace Engineering",
      "Chemical Engineering",
      "Automotive Engineering",
      "Manufacturing",
      "Industrial Engineering"
    ]
  }
];

export const TAG_OPTIONS = {
  streams: [
    "Science (Math)",
    "Science (Bio)",
    "Commerce",
    "Arts & Humanities",
    "Technology"
  ],
  interests: INTEREST_CATEGORIES.flatMap(c => c.subOptions),
  strengths: [
    "Logic & Math", "Visual Creativity", "Communication", "Leadership",
    "Problem Solving", "Attention to Detail", "Strategic Thinking", "Empathy",
    "Technical Troubleshooting", "Persuasion", "Memorization", "Physical Endurance"
  ],
  weaknesses: [
    "Public Speaking", "Repetitive Tasks", "High Pressure", "Complex Math",
    "Managing Others", "Abstract Theory", "Blood/Medical Procedures"
  ],
  goals: [
    "High Salary", "Work Life Balance", "Remote Work", "Innovation",
    "Social Impact", "Job Security", "Leadership Role", "Creative Freedom"
  ]
};
