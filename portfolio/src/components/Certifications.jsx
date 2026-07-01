import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiFileText } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { certifications } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const Certifications = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="certifications"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Certifications"
          subtitle="My credentials"
          isDark={isDark}
        />

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative p-8 rounded-2xl text-center transition-all shine-effect overflow-hidden ${
                isDark
                  ? 'bg-gray-800 border border-gray-700/50 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10'
                  : 'bg-white border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Background gradient orb */}
              <div
                className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${cert.color} opacity-10 blur-2xl`}
              />
              <div
                className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br ${cert.color} opacity-5 blur-2xl`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${cert.color} text-white text-4xl mb-5 shadow-lg mx-auto`}
              >
                {cert.icon}
              </div>

              {/* Content */}
              <h3
                className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {cert.title}
              </h3>
              <p className={`text-sm mb-1 font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {cert.issuer}
              </p>

              {/* PDF badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg mb-5 ${
                isDark ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-100 text-gray-500'
              }`}>
                <FiFileText size={11} />
                PDF Certificate
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700/20">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cert.year}
                </span>
                <motion.a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    isDark
                      ? 'bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                  }`}
                >
                  <FiAward size={13} />
                  View Certificate
                  <FiExternalLink size={11} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
