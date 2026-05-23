import { FiShield, FiClock, FiAward, FiHeart, FiSmile, FiPhone } from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "Verified Doctors",
    desc: "All our doctors are thoroughly verified with valid medical licenses and credentials.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FiClock,
    title: "24/7 Availability",
    desc: "Book appointments any time of day or night. We're always here when you need us.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FiAward,
    title: "Top Specialists",
    desc: "Access to over 50 specialists across 15+ medical fields in Bangladesh.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: FiHeart,
    title: "Patient-First Care",
    desc: "We prioritize your health and comfort above everything else in every interaction.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: FiSmile,
    title: "Easy Experience",
    desc: "Simple, intuitive booking process that takes less than 2 minutes to complete.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FiPhone,
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation and reminders for your appointments.",
    color: "bg-primary-50 text-primary-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              Why DocAppoint
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-800 mb-5 leading-tight">
              Healthcare Made Simple,{" "}
              <span className="text-primary-600">Fast & Reliable</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We understand how stressful finding the right doctor can be. That's why we've built a platform that makes healthcare accessible to everyone in Bangladesh — from anywhere, at any time.
            </p>

            {/* Progress bars */}
            <div className="space-y-4">
              {[
                { label: "Patient Satisfaction", value: 98 },
                { label: "Appointment Success Rate", value: 95 },
                { label: "Doctor Availability", value: 90 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600 font-medium">{item.label}</span>
                    <span className="text-primary-600 font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.color} mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-lg" />
                  </div>
                  <h4 className="font-semibold text-dark-800 mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;