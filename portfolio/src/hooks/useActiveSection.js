import { useState, useEffect } from 'react';

const useActiveSection = (sections) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observers = [];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sections]);

  return activeSection;
};

export default useActiveSection;
