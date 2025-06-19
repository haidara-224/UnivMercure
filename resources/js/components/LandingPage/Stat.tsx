import { motion, useAnimation, useInView } from 'framer-motion';
import { BookOpen, FlaskConical, School, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function Stat() {
  const stats = [
    { value: 5000, label: "Étudiants", icon: <Users className="w-8 h-8" /> },
    { value: 20, label: "Départements", icon: <School className="w-8 h-8" /> },
    { value: 15, label: "Laboratoires", icon: <FlaskConical className="w-8 h-8" /> },
    { value: 120, label: "Programmes", icon: <BookOpen className="w-8 h-8" /> }
  ];

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-2xl overflow-hidden">
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.1, 0],
              scale: [1, 1.5, 2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
              damping: 10
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{
                scale: 1.1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20">
                {React.cloneElement(stat.icon, { className: "w-10 h-10 text-amber-400" })}
              </div>
            </motion.div>

            <AnimatedCounter value={stat.value} delay={index * 0.2} />

            <motion.p
              className="text-white/80 text-lg font-medium mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            >
              {stat.label}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const AnimatedCounter = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.1, 1],
        textShadow: [
          '0 0 0px rgba(251, 191, 36, 0)',
          '0 0 10px rgba(251, 191, 36, 0.5)',
          '0 0 0px rgba(251, 191, 36, 0)'
        ],
        transition: {
          duration: 1.5,
          delay,
          ease: 'easeOut'
        }
      });

      const start = 0;
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;

      const easeOutQuad = (t: number) => t * (2 - t);

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(easedProgress * (end - start) + start);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, delay, controls]);

  return (
    <motion.span
      ref={ref}
      animate={controls}
      className="text-5xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
    >
      {displayValue.toLocaleString()}
      <motion.span
        className="text-amber-400/80"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        +
      </motion.span>
    </motion.span>
  );
};
