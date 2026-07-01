import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { education } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const Education = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="education"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-950' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Education" subtitle="My academic journey" isDark={isDark} />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
          {/* Animated line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500 origin-top"
          />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                  className="absolute left-4 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 z-10"
                >
                  <span className="text-sm">{edu.icon}</span>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4, scale: 1.01 }}
                  className={`p-6 rounded-2xl transition-all shine-effect ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700/50 hover:border-indigo-500/40'
                      : 'bg-white border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {edu.degree}
                      </h3>
                      <p className="text-indigo-500 font-semibold mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                          isDark
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                        }`}
                      >
                        {edu.year}
                      </span>
                      <p
                        className={`mt-2 text-sm font-bold ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      >
                        {edu.percentage}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {edu.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
