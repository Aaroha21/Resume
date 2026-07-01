import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, isDark, light = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14"
    >
      {subtitle && (
        <p
          className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            light ? 'text-indigo-300' : 'text-indigo-500'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-black section-title inline-block ${
          isDark || light ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      <div className="flex justify-center mt-4">
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
