import { motion } from 'framer-motion';
import { FiUser, FiTarget, FiBook, FiCode } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const stats = [
  { label: 'Projects Built', value: '10+', icon: <FiCode size={20} /> },
  { label: 'Technologies', value: '15+', icon: <FiBook size={20} /> },
  { label: 'Certifications', value: '4+', icon: <FiUser size={20} /> },
  { label: 'Years Learning', value: '3+', icon: <FiTarget size={20} /> },
];

const cards = [
  {
    icon: <FiUser size={24} />,
    title: 'Who I Am',
    content: personalInfo.about,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: <FiTarget size={24} />,
    title: 'Career Objective',
    content: personalInfo.objective,
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const About = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better"
          isDark={isDark}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className={`p-6 rounded-2xl text-center transition-all shine-effect ${
                isDark
                  ? 'bg-gray-800 border border-gray-700/50 hover:border-indigo-500/50'
                  : 'bg-white border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-center mb-3 text-indigo-500">{stat.icon}</div>
              <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* About cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl transition-all shine-effect ${
                isDark
                  ? 'bg-gray-800 border border-gray-700/50 hover:border-indigo-500/30'
                  : 'bg-white border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-lg'
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-4 shadow-lg`}
              >
                {card.icon}
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {card.title}
              </h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick info row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`p-6 rounded-2xl grid sm:grid-cols-3 gap-6 ${
            isDark
              ? 'bg-gray-800/50 border border-gray-700/50'
              : 'bg-indigo-50/50 border border-indigo-100'
          }`}
        >
          {[
            { label: 'Name', value: personalInfo.name, emoji: '👤' },
            { label: 'Location', value: personalInfo.location, emoji: '📍' },
            { label: 'Email', value: personalInfo.email, emoji: '📧' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.label}
                </p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
