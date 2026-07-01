import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import ParticleBackground from './ParticleBackground';
import heroImage from '../assets/hero.png';

const socialLinks = [
  { icon: <FiGithub size={22} />, href: personalInfo.github, label: 'GitHub', color: 'hover:text-gray-300' },
  { icon: <FiLinkedin size={22} />, href: personalInfo.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: <FiMail size={22} />, href: `mailto:${personalInfo.email}`, label: 'Email', color: 'hover:text-red-400' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50'
      }`}
    >
      <ParticleBackground />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-600'
                }`}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Hi, I'm{' '}
              <span className="gradient-text block sm:inline">{personalInfo.name}</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              variants={itemVariants}
              className={`text-xl sm:text-2xl font-semibold mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <span className="gradient-text">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'React.js Expert',
                    2000,
                    'FastAPI Developer',
                    2000,
                    'Problem Solver',
                    2000,
                    'UI/UX Enthusiast',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {personalInfo.about}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href={personalInfo.resumeUrl}
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white animated-gradient shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
              >
                <FiDownload size={18} />
                Download Resume
              </motion.a>
              <Link to="contact" smooth duration={600} offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all ${
                    isDark
                      ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-500/10'
                      : 'border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Contact Me
                  <FiArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Find me on
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-xl transition-all duration-200 ${
                      isDark
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-500/30"
              />

              {/* Avatar container */}
              <div className="absolute inset-8 rounded-full animated-gradient p-1 pulse-glow">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  {/* Profile photo */}
                  <img
                    src={heroImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                React ⚛️
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-2 -left-2 bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                FastAPI 🚀
              </motion.div>
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-1/2 -right-8 bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                Supabase 🗄️
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-indigo-500/50 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
