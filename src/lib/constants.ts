// ─── Personal Info ────────────────────────────────────────────
export const PERSONAL = {
  name: "Atul Kumar",
  tagline: "MCA Student @ MIT World Peace University",
  subtitle: "Aspiring Software Engineer",
  description:
    "Crafting high-performance digital experiences with code and creativity. Specializing in Python, Java, and modern web architectures.",
  email: "atulindian2004@gmail.com",
  location: "Pune, India",
  from: "Khunti, Jharkhand",
  resumeUrl: "/resume/Atul_Kumar_Resume.pdf",
  profileImage: "/images/profile.jpg",
  social: {
    github: "https://github.com/atulkumar",
    linkedin: "https://linkedin.com/in/atulkumar",
    instagram: "https://instagram.com/atulkumar",
    email: "mailto:atulindian2004@gmail.com",
  },
} as const;

// ─── Typing Animation Titles ──────────────────────────────────
export const TYPING_TITLES = [
  "Atul Kumar",
  "MCA Student",
  "Aspiring Software Engineer",
  "Python & Java Developer",
];

// ─── Stats ────────────────────────────────────────────────────
export const STATS = [
  { value: "MCA", label: "@ MIT-WPU" },
  { value: "3+", label: "Projects" },
  { value: "3", label: "Certifications" },
  { value: "CMPDI", label: "Internship" },
];

// ─── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Appointment", href: "#booking" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Skills ───────────────────────────────────────────────────
export interface SkillCategory {
  title: string;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: "Programming",
    icon: "code",
    color: "primary",
    skills: ["Java", "Python", "C++"],
  },
  {
    title: "Frameworks",
    icon: "layers",
    color: "secondary",
    skills: ["Django"],
  },
  {
    title: "Databases",
    icon: "database",
    color: "tertiary",
    skills: ["MySQL"],
  },
  {
    title: "Tools",
    icon: "construction",
    color: "primary",
    skills: ["GitHub", "VS Code"],
  },
];

export const SOFT_SKILLS = ["Communication", "Teamwork", "Problem Solving"];

// ─── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: "web" | "system";
  image: string;
  metric: { value: string; label: string };
  features: string[];
  github: string;
  demo: string;
}

export const PROJECTS: Project[] = [
  {
    id: "restaurant-management",
    title: "Restaurant Management",
    description:
      "A comprehensive ERP for modern dining, managing inventory, orders, and billing workflows.",
    longDescription:
      "Full-featured restaurant management system with menu management, online ordering, table reservation, and email notifications.",
    tech: ["Python", "Django"],
    category: "web",
    image: "/images/projects/restaurant.jpg",
    metric: { value: "15%", label: "Faster Checkout" },
    features: [
      "Menu Management",
      "Online Ordering",
      "Table Reservation",
      "Email Notifications",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "library-management",
    title: "Library Management",
    description:
      "Digital cataloging system with automated reminder engines and robust search algorithms.",
    longDescription:
      "Complete library management system handling book management, borrowing system, and user management.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "web",
    image: "/images/projects/library.jpg",
    metric: { value: "5k+", label: "Books Indexed" },
    features: ["Book Management", "Borrowing System", "User Management"],
    github: "#",
    demo: "#",
  },
  {
    id: "complaint-management",
    title: "CMPDI Complaint Portal",
    description:
      "A high-security portal developed for CMPDI to streamline internal grievance redressal mechanisms.",
    longDescription:
      "Complaint management system built for CMPDI Ranchi featuring complaint tracking, workflow management, and 30% improved efficiency.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "system",
    image: "/images/projects/complaint.jpg",
    metric: { value: "30%", label: "Efficiency Boost" },
    features: [
      "Complaint Tracking",
      "Workflow Management",
      "Improved Efficiency by 30%",
    ],
    github: "#",
    demo: "#",
  },
];

// ─── Experience ───────────────────────────────────────────────
export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    period: "2023 - Present",
    title: "Web Development Intern",
    company: "CMPDI Ranchi (Coal India Subsidiary)",
    description:
      "Gained industry experience at a Miniratna company building enterprise-grade web applications.",
    achievements: [
      "Developed a Complaint Management System using modern web stacks.",
      "Automated department-wide ticket routing, reducing resolution time by 30%.",
      "Worked with PHP and MySQL for backend development.",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────
export interface Education {
  period: string;
  degree: string;
  institution: string;
  highlight?: boolean;
}

export const EDUCATION: Education[] = [
  {
    period: "2023-25",
    degree: "Master of Computer Applications",
    institution: "MIT World Peace University, Pune",
    highlight: true,
  },
  {
    period: "2020-23",
    degree: "Bachelor of Computer Applications",
    institution: "Sarala Birla University",
  },
  {
    period: "2018-20",
    degree: "Intermediate (12th)",
    institution: "Loyola Inter College",
  },
  {
    period: "2016-18",
    degree: "Matriculation (10th)",
    institution: "DAV Public School",
  },
];

// ─── Certifications ──────────────────────────────────────────
export interface Certification {
  title: string;
  issuer: string;
  icon: string;
  description: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    icon: "analytics",
    description:
      "Completed Deloitte's Data Analytics virtual experience, covering data analysis, visualization, and business insights.",
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    icon: "memory",
    description:
      "Completed Deloitte's Technology virtual experience, covering technology consulting and solution design.",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco",
    icon: "lan",
    description:
      "Cisco certified in networking fundamentals including TCP/IP, routing, switching, and network security basics.",
  },
];

// ─── About Timeline ──────────────────────────────────────────
export interface TimelineItem {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const ABOUT_TIMELINE: TimelineItem[] = [
  {
    icon: "school",
    title: "Academic Foundation",
    description:
      "Early passion for technology ignited through creative problem-solving and logic puzzles during secondary education at DAV Public School, Khunti, Jharkhand. Excelled in mathematics and science, laying the groundwork for a career in engineering.",
  },
  {
    icon: "terminal",
    title: "BCA @ Sarala Birla University",
    description:
      "Transitioned to formal computer science education. Mastered core fundamentals of data structures, algorithms, and web development. Developed first major library management system during this phase.",
  },
  {
    icon: "work",
    title: "Internship @ CMPDI",
    description:
      "Gained industry experience at a Miniratna company. Built a high-impact Complaint Management System that automated workflows and improved reporting efficiency by 30% for internal stakeholders.",
    highlight: true,
  },
  {
    icon: "school",
    title: "MCA @ MIT-WPU Pune",
    description:
      "Currently specializing in advanced software engineering practices at a top-tier institution. Deep-diving into Django, system design, and large-scale application architecture.",
  },
];

// ─── Time Slots ───────────────────────────────────────────────
export const TIME_SLOTS = [
  "09:00 AM IST",
  "10:00 AM IST",
  "11:00 AM IST",
  "02:00 PM IST",
  "03:00 PM IST",
  "04:00 PM IST",
];
