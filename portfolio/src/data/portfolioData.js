export const personalInfo = {
  name: 'Aaroha Vartak',
  initials: 'AV',
  role: 'Full Stack Developer',
  tagline: 'Building modern web experiences with React & FastAPI',
  email: 'av.project.2103@gmail.com',
  github: 'https://github.com/Aaroha21',
  linkedin: 'https://www.linkedin.com/in/aaroha-vartak/',
  location: 'India',
  resumeUrl: '/resume.pdf',
  logoImage: '/logo.png', // Place your AV logo in public/logo.png
  about: `I'm a passionate Full Stack Developer with expertise in building modern, scalable web applications. I specialize in React.js for frontend development and FastAPI for backend services, with hands-on experience in Supabase and SQL databases.`,
  objective: `My career objective is to leverage my technical skills in full-stack development to build impactful digital solutions. I aim to contribute to innovative projects while continuously growing as a developer and collaborating with driven teams.`,
  profileImage: null, // Will use a gradient avatar
};

export const skills = {
  frontend: [
    { name: 'HTML', level: 80, icon: '🌐' },
    { name: 'CSS', level: 75, icon: '🎨' },
    { name: 'JavaScript', level: 75, icon: '⚡' },
    { name: 'React.js', level: 85, icon: '⚛️' },
  ],
  backend: [
    { name: 'FastAPI', level: 80, icon: '🚀' },
    { name: 'Python', level: 90, icon: '🐍' },
    { name: 'REST APIs', level: 80, icon: '🔗' },
  ],
  database: [
    { name: 'Supabase', level: 85, icon: '🗄️' },
    { name: 'SQL', level: 70, icon: '💾' },
    { name: 'PostgreSQL', level: 75, icon: '🐘' },
  ],
  tools: [
    { name: 'Git', level: 70, icon: '📦' },
    { name: 'GitHub', level: 90, icon: '🐙' },
    { name: 'VS Code', level: 95, icon: '💻' },
  ],
};

export const projects = [
  {
    id: 1,
    title: 'Watch Store Website',
    category: 'Frontend',
    description:
      'A modern e-commerce website for a luxury watch brand featuring products like Rolex Classic, Omega Elite, and Titan Premium. Built with React and includes Home, About, Services, and Products sections with a responsive design.',
    technologies: ['React', 'CSS3', 'JavaScript', 'Vite'],
    image: null,
    color: 'from-amber-500 to-orange-600',
    github: 'https://github.com/Aaroha21/watch-store',
    demo: 'https://watch-store-demo.vercel.app',
    featured: true,
  },
  {
    id: 2,
    title: 'Services Integrations App',
    category: 'Full Stack',
    description:
      'A full-stack application integrating multiple third-party services — Gemini AI, Groq AI, Vision API, email sending via Nodemailer & Resend, and Supabase database. React frontend with a Node.js/Express backend.',
    technologies: ['React', 'Node.js', 'Express', 'Gemini AI', 'Groq', 'Supabase', 'Nodemailer', 'Resend'],
    image: null,
    color: 'from-indigo-500 to-purple-600',
    github: 'https://github.com/Aaroha21/services-integrations',
    demo: '#',
    featured: true,
  },
];

export const education = [  
  {
    id: 1,
    degree: 'Central Board of Secondary Education (CBSE)',
    institution: 'Notre Dame School, Vasai West',
    year: '2024 – 2025',
    percentage: '83.40%',
    description: 'Completed schooling with first class and distinction.',
    icon: '🏫',
  },
  {
    id: 2,
    degree: 'University',
    institution: "Vidhyavardhini's Bhausaheb Vartak Polytechnic",
    year: '2024 – 2028',
    description: 'Currently persuing diploma in computer science',
    icon: '📚',
  },
];

export const certifications = [
  {
    id: 1,
    title: 'Microsoft Certification',
    issuer: 'Microsoft',
    year: '2024',
    icon: '🪟',
    color: 'from-blue-500 to-cyan-500',
    credential: '/certificate-microsoft.pdf',
  },
  {
    id: 2,
    title: 'Professional Certificate',
    issuer: 'Certification Authority',
    year: '2025',
    icon: '🏆',
    color: 'from-indigo-500 to-purple-500',
    credential: '/certificate-aaroha.pdf',
  },
];

export const projectCategories = ['All', 'Frontend', 'Full Stack'];
