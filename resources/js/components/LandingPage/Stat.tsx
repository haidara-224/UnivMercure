"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { BookOpen, FlaskConical, School, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Stat() {
  const stats = [
    { value: 5000, label: "Étudiants", icon: <Users /> },
    { value: 20, label: "Départements", icon: <School /> },
    { value: 15, label: "Laboratoires", icon: <FlaskConical /> },
    { value: 120, label: "Programmes", icon: <BookOpen /> },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-16 bg-[#0f172a] text-white overflow-hidden">
      {/* Halo lumineux */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-3xl rounded-full z-0" />

      {/* Titre */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Une université en chiffres
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Découvrez l’envergure et l’impact de notre établissement à travers
          quelques statistiques clés.
        </p>
      </div>

      {/* Statistiques */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Icône */}
            <motion.div
              className="flex justify-center mb-4"
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20">
                {React.cloneElement(stat.icon, {
                  className: "w-10 h-10 text-amber-400",
                })}
              </div>
            </motion.div>

            {/* Compteur animé */}
            <AnimatedCounter value={stat.value} delay={index * 0.15} />

            {/* Label */}
            <p className="text-lg font-medium text-white/80 mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const AnimatedCounter = ({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, delay, ease: "easeOut" },
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
        const currentValue = Math.floor(
          easedProgress * (end - start) + start
        );
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
      className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
    >
      {displayValue.toLocaleString()}+
    </motion.span>
  );
};
