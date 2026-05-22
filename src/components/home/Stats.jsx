import { useEffect, useRef, useState } from "react";
import { FiUsers, FiAward, FiCalendar, FiStar } from "react-icons/fi";

const statsData = [
  { icon: FiUsers,    value: 500,  suffix: "+", label: "Happy Patients",      color: "text-blue-500"    },
  { icon: FiAward,    value: 50,   suffix: "+", label: "Expert Doctors",      color: "text-primary-500" },
  { icon: FiCalendar, value: 1000, suffix: "+", label: "Appointments Booked", color: "text-purple-500"  },
  { icon: FiStar,     value: 15,   suffix: "+", label: "Specialties",         color: "text-amber-500"   },
];
// goods
const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ stat, animate }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 2000, animate);

  return (
    <div className="text-center group">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 ${stat.color} text-2xl mb-4 group-hover:scale-110 transition-transform`}>
        <Icon />
      </div>
      <p className="text-4xl md:text-5xl font-display font-bold text-white mb-1">
        {count}{stat.suffix}
      </p>
      <p className="text-primary-200 text-sm font-medium">{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0c744f 0%, #0d9260 50%, #0b4c35 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Trusted By Thousands
          </h2>
          <p className="text-primary-200 max-w-lg mx-auto">
            Our numbers speak for themselves. Join the growing community of patients who trust DocAppoint.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat) => (
            <StatItem key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;