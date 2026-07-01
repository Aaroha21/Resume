import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import avLogo from '../assets/logo.png';

const socials = [
  { icon: <FiGithub size={20} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiMail size={20} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact'];

const Footer = () => {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer
      className={`relative py-12 ${
        isDark
          ? 'bg-gray-900 border-t border-gray-800'
          : 'bg-gray-100 border-t border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20">
                <img
                  src={avLogo}
                  alt="AV Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aaroha<span className="gradient-text">Vartak</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer passionate about building modern web experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={`font-bold mb-3 text-sm uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={link.toLowerCase()}
                  smooth
                  duration={600}
                  offset={-70}
                  className={`text-sm cursor-pointer transition-colors hover:text-indigo-500 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className={`font-bold mb-3 text-sm uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-xl transition-all ${
                    isDark
                      ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:text-indigo-600 shadow-sm hover:shadow'
                  }`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm text-center sm:text-left ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            © {year} {personalInfo.name}. Made with{' '}
            <FiHeart className="inline text-red-500" size={13} /> using React & Tailwind CSS
          </p>

          {/* Back to top */}
          <Link to="home" smooth duration={800}>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30"
              aria-label="Back to top"
            >
              <FiArrowUp size={16} />
              Back to top
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
