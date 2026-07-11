import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import SectionTitle from './SectionTitle';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: <FiMail size={20} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: <FiMapPin size={20} />, label: 'Location', value: personalInfo.location, href: null },
  { icon: <FiGithub size={20} />, label: 'GitHub', value: 'github.com/Aaroha21', href: personalInfo.github },
  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', value: 'linkedin.com/in/aaroha-vartak', href: personalInfo.linkedin },
];

const inputClass = (isDark, hasError) =>
  `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-indigo-500/50 ${hasError
    ? 'border-red-500 bg-red-500/5'
    : isDark
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:bg-white'
  }`;

const Contact = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon. 🎉', {
          duration: 5000,
          style: { background: isDark ? '#1f2937' : '#fff', color: isDark ? '#fff' : '#111', border: '1px solid #6366f1' },
        });
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.', {
          style: { background: isDark ? '#1f2937' : '#fff', color: isDark ? '#fff' : '#111' },
        });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        style: { background: isDark ? '#1f2937' : '#fff', color: isDark ? '#fff' : '#111' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 lg:py-28 ${isDark ? 'bg-gray-950' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" isDark={isDark} />

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Let's build something amazing together
            </h3>
            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm currently open to freelance projects and full-time opportunities. Whether you have a project in mind,
              a question, or just want to connect — my inbox is always open!
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${isDark
                        ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700/50 hover:border-indigo-500/40'
                        : 'bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200'
                        }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.label}
                        </p>
                        <p className={`text-sm font-medium group-hover:text-indigo-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div
                      className={`flex items-center gap-4 p-4 rounded-xl ${isDark
                        ? 'bg-gray-800 border border-gray-700/50'
                        : 'bg-gray-50 border border-gray-200'
                        }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.label}
                        </p>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`p-6 sm:p-8 rounded-2xl ${isDark
                ? 'bg-gray-800 border border-gray-700/50'
                : 'bg-gray-50 border border-gray-200 shadow-sm'
                }`}
            >
              <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send me a message
              </h3>

              {/* Name */}
              <div className="mb-4">
                <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiUser className="inline mr-1.5" size={14} />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="ABC"
                  className={inputClass(isDark, !!errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiMail className="inline mr-1.5" size={14} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="abc@example.com"
                  className={inputClass(isDark, !!errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiMessageSquare className="inline mr-1.5" size={14} />
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Hi Aaroha, I'd love to work with you on..."
                  className={inputClass(isDark, !!errors.message) + ' resize-none'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white animated-gradient shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 loader" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
