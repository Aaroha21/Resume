import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { projects, projectCategories } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const ProjectCard = ({ project, isDark, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`rounded-2xl overflow-hidden transition-all duration-300 shine-effect ${
        isDark
          ? 'bg-gray-800 border border-gray-700/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10'
          : 'bg-white border border-gray-200 hover:border-indigo-200 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Project visual */}
      <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white/20 text-9xl font-black select-none"
          >
            {project.title.charAt(0)}
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/20" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
            {project.category}
          </span>
        </div>

        {/* Links overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition"
          >
            <FiGithub size={16} /> Code
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition"
          >
            <FiExternalLink size={16} /> Demo
          </motion.a>
        </motion.div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                isDark
                  ? 'bg-gray-700 text-gray-300 border border-gray-600'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex gap-3 pt-2 border-t border-gray-700/30">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <FiGithub size={14} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            <FiExternalLink size={14} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="My Projects" subtitle="Things I've built" isDark={isDark} />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30'
                  : isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-indigo-500/50'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FiCode size={48} className="mx-auto text-gray-500 mb-4" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
