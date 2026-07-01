import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { skills } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const categoryColors = {
  Frontend: { from: 'from-indigo-500', to: 'to-purple-600', text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  Backend: { from: 'from-cyan-500', to: 'to-blue-600', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  Database: { from: 'from-green-500', to: 'to-emerald-600', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  Tools: { from: 'from-orange-500', to: 'to-amber-600', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
};

const SkillBar = ({ skill, isDark, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`p-4 rounded-xl transition-all hover:scale-[1.02] shine-effect ${
        isDark
          ? 'bg-gray-800/60 border border-gray-700/50 hover:border-gray-600'
          : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{skill.icon}</span>
          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {skill.name}
          </span>
        </div>
        <span className={`text-sm font-bold ${color.text}`}>{skill.level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${color.from} ${color.to}`}
        />
      </div>
    </motion.div>
  );
};

const categories = [
  { key: 'frontend', label: 'Frontend', ...categoryColors.Frontend },
  { key: 'backend', label: 'Backend', ...categoryColors.Backend },
  { key: 'database', label: 'Database', ...categoryColors.Database },
  { key: 'tools', label: 'Tools', ...categoryColors.Tools },
];

const Skills = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('frontend');

  const activeCategory = categories.find((c) => c.key === activeTab);
  const activeSkills = skills[activeTab] || [];

  return (
    <section
      id="skills"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-950' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="My Skills" subtitle="What I work with" isDark={isDark} />

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                activeTab === cat.key
                  ? `bg-gradient-to-r ${cat.from} ${cat.to} text-white border-transparent shadow-lg`
                  : isDark
                  ? `${cat.bg} ${cat.border} ${cat.text} hover:${cat.bg}`
                  : `bg-gray-100 border-gray-200 text-gray-600 hover:border-indigo-300`
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {activeSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <SkillBar skill={skill} isDark={isDark} color={activeCategory} />
            </motion.div>
          ))}
        </motion.div>

        {/* All skills overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className={`text-center text-lg font-bold mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Tech Stack Overview
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(skills)
              .flat()
              .map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-default ${
                    isDark
                      ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-indigo-500/50 hover:text-indigo-400'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
