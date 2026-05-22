import { Link, useNavigate } from "react-router-dom";
import { FiStar, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const DoctorCard = ({ doctor }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (user) {
      navigate(`/doctors/${doctor._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-primary-50">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=0d9260&color=fff&size=200`;
          }}
        />
        {/* Specialty badge */}
        <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          {doctor.specialty}
        </span>
        {/* Rating */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-500 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          {doctor.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-dark-800 mb-1">
          {doctor.name}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <FiMapPin className="text-primary-500 shrink-0" />
          <span className="truncate">{doctor.hospital}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <FiClock className="text-primary-500 shrink-0" />
          <span>{doctor.experience} experience</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Consultation Fee</p>
            <p className="text-primary-600 font-bold text-lg">৳{doctor.fee}</p>
          </div>
          <button
            onClick={handleViewDetails}
            className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 group-hover:gap-2.5"
          >
            View Details
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;