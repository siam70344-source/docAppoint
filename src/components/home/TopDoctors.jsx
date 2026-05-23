    import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import Spinner from "../shared/Spinner";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/doctors/top`)
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Top Rated
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-800 mb-3">
            Meet Our Expert Doctors
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our highly qualified doctors are committed to providing the best medical care with years of experience and dedication.
          </p>
        </div>

        {/* Cards */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* View all buttons */}
        <div className="text-center mt-10">
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-medium px-8 py-3 rounded-xl transition-all duration-200"
          >
            View All Doctors
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;