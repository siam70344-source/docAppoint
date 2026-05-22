import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiUsers, FiAward } from "react-icons/fi";

const slides = [
  {
    id: 1,
    badge: "Trusted Healthcare Platform",
    title: "Your Health Is Our",
    highlight: "Top Priority",
    desc: "Connect with Bangladesh's most experienced doctors. Book appointments instantly, manage your health journey with ease.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    bg: "from-primary-900 via-primary-800 to-dark-800",
  },
  {
    id: 2,
    badge: "Expert Medical Care",
    title: "Find The Right Doctor",
    highlight: "For You",
    desc: "Browse specialists across cardiology, neurology, dermatology and more. Quality care is just a click away.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    bg: "from-dark-800 via-primary-900 to-primary-800",
  },
  {
    id: 3,
    badge: "Easy Appointment Booking",
    title: "Book Appointments",
    highlight: "In Minutes",
    desc: "No more waiting in queues. Schedule, manage and track your appointments from the comfort of your home.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
    bg: "from-primary-800 via-dark-800 to-primary-900",
  },
];

const stats = [
  { icon: <FiUsers />,    value: "500+",  label: "Happy Patients"     },
  { icon: <FiAward />,    value: "50+",   label: "Expert Doctors"     },
  { icon: <FiCalendar />, value: "1000+", label: "Appointments Booked" },
];

const HeroBanner = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-screen min-h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 bg-primary-600/30 border border-primary-400/40 text-primary-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
                    {slide.title}{" "}
                    <span className="text-primary-400">{slide.highlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                    {slide.desc}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/appointments"
                      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-600/30 hover:shadow-xl"
                    >
                      Book Appointment
                      <FiArrowRight />
                    </Link>
                    <Link
                      to="/appointments"
                      className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm"
                    >
                      View All Doctors
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats bar */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 text-primary-600 rounded-xl text-lg mb-2">
                {stat.icon}
              </div>
              <p className="text-2xl font-display font-bold text-dark-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;