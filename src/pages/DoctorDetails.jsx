import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FiMapPin, FiClock, FiStar, FiCalendar,
  FiPhone, FiX, FiUser, FiMail,
} from "react-icons/fi";
import Spinner from "../components/shared/Spinner";

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doctor, setDoctor]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    patientName: user?.displayName || "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Doctor not found");
        navigate("/appointments");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          ...form,
          userEmail: user.email,
          doctorId:  doctor._id,
          doctorName: doctor.name,
        },
        { withCredentials: true }
      );
      toast.success("Appointment booked successfully!");
      setModalOpen(false);
      setForm({
        patientName: user?.displayName || "",
        gender: "", phone: "",
        appointmentDate: "", appointmentTime: "",
      });
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!doctor)  return null;

  return (
    <>
      <Helmet>
        <title>{doctor.name} — DocAppoint</title>
        <meta name="description" content={doctor.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Doctor card */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary-900 to-primary-700 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Photo */}
                <div className="shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-36 h-36 rounded-2xl object-cover border-4 border-white/20"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=0d9260&color=fff&size=200`;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <span className="inline-block bg-primary-500/30 text-primary-200 text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {doctor.specialty}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    {doctor.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-primary-200 text-sm mb-4">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin /> {doctor.hospital}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock /> {doctor.experience} experience
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiStar className="fill-yellow-400 text-yellow-400" />
                      {doctor.rating} ({doctor.totalReviews} reviews)
                    </span>
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    <FiCalendar />
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display font-bold text-lg text-dark-800 mb-3">About</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{doctor.description}</p>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-dark-800 mb-3">Details</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center shrink-0">
                      <FiMapPin />
                    </span>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-gray-700 font-medium">{doctor.location}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center shrink-0">
                      <FiClock />
                    </span>
                    <div>
                      <p className="text-xs text-gray-400">Availability</p>
                      {doctor.availability?.map((slot, i) => (
                        <p key={i} className="text-gray-700 font-medium">{slot}</p>
                      ))}
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center shrink-0">
                      <FiPhone />
                    </span>
                    <div>
                      <p className="text-xs text-gray-400">Consultation Fee</p>
                      <p className="text-primary-600 font-bold text-lg">৳{doctor.fee}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-display font-bold text-xl text-dark-800">
                  Book Appointment
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{doctor.name}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-all"
              >
                <FiX />
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleBooking} className="p-6 space-y-4">
              {/* Doctor name - readonly */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Doctor
                </label>
                <input
                  type="text"
                  value={doctor.name}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                />
              </div>

              {/* User email - readonly */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Patient name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Patient Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    name="appointmentTime"
                    value={form.appointmentTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  >
                    <option value="">Select time</option>
                    {doctor.availability?.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fee info */}
              <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">Consultation Fee</span>
                <span className="text-primary-600 font-bold text-lg">৳{doctor.fee}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all"
              >
                {submitting ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorDetails;