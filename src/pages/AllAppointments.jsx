import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { FiSearch, FiMapPin, FiClock, FiStar, FiArrowRight } from "react-icons/fi";
import Spinner from "../components/shared/Spinner";

const AllAppointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [query, setQuery]       = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/doctors?search=${query}`)
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const handleViewDetails = (id) => {
    if (user) {
      navigate(`/doctors/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet>
        <title>All Appointments — DocAppoint</title>
        <meta name="description" content="Browse all available doctors and book your appointment today." />
      </Helmet>

      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Find Your Doctor
          </h1>
          <p className="text-primary-200 mb-8 max-w-lg mx-auto">
            Browse our network of experienced specialists and book your appointment today.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by doctor name..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm bg-white text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-400 text-white font-medium px-6 py-3.5 rounded-xl transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Doctors grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <Spinner />
        ) : doctors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No doctors found for "{query}"</p>
            <button
              onClick={() => { setSearch(""); setQuery(""); }}
              className="mt-4 text-primary-600 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">
              Showing <span className="font-semibold text-dark-800">{doctors.length}</span> doctors available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
                >
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
                    <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-yellow-500 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <FiStar className="fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-dark-800 mb-1">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                      <FiMapPin className="text-primary-500 shrink-0" />
                      <span className="truncate">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                      <FiClock className="text-primary-500 shrink-0" />
                      <span>{doctor.experience} experience</span>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      {doctor.availability?.slice(0, 1).map((slot, i) => (
                        <span key={i} className="inline-block bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full">
                          {slot}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">Fee</p>
                        <p className="text-primary-600 font-bold text-lg">৳{doctor.fee}</p>
                      </div>
                      <button
                        onClick={() => handleViewDetails(doctor._id)}
                        className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
                      >
                        View Details
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllAppointments;