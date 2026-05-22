import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111a15" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0d9260" }}>
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
              Doc<span style={{ color: "#3bce8d" }}>Appoint</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Connecting patients with the best doctors in Bangladesh. Book appointments easily and manage your health journey.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <FaFacebook />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <FaXTwitter />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</Link></li>
            <li><Link to="/appointments" className="text-gray-400 hover:text-green-400 transition-colors">All Appointments</Link></li>
            <li><Link to="/dashboard" className="text-gray-400 hover:text-green-400 transition-colors">Dashboard</Link></li>
            <li><Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors">Login</Link></li>
            <li><Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors">Register</Link></li>
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h4 className="text-white font-semibold mb-4">Specialties</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Cardiology</li>
            <li>Neurology</li>
            <li>Dermatology</li>
            <li>Orthopedics</li>
            <li>Pediatrics</li>
            <li>Gastroenterology</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0" style={{ color: "#3bce8d" }} />
              Dhanmondi, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0" style={{ color: "#3bce8d" }} />
              +880 1712-345678
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0" style={{ color: "#3bce8d" }} />
              support@docappoint.com
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t py-5 text-center text-xs text-gray-500" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        © {new Date().getFullYear()} DocAppoint. All rights reserved. Built with ❤️ in Bangladesh.
      </div>
    </footer>
  );
};

export default Footer;