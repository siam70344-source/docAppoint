import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FiCalendar, FiClock, FiPhone, FiUser,
  FiEdit2, FiTrash2, FiX,
} from "react-icons/fi";
import Spinner from "../../components/shared/Spinner";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected]   = useState(null);
  const [form, setForm]           = useState({});
  const [saving, setSaving]       = useState(false);

  const fetchBookings = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/appointments/my?email=${user.email}`,
        { withCredentials: true }
      )
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const openEdit = (booking) => {
    setSelected(booking);
    setForm({
      patientName:     booking.patientName,
      gender:          booking.gender,
      phone:           booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    });
    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/appointments/${selected._id}`,
        form,
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === selected._id ? res.data : b))
      );
      toast.success("Appointment updated successfully!");
      setEditModal(false);
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/appointments/${id}`,
        { withCredentials: true }
      );
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch {
      toast.error("Delete failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>My Bookings — DocAppoint</title>
      </Helmet>

      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-dark-800">My Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all your appointments</p>
        </div>

        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center">
            <FiCalendar className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-400 mb-2">
              No Appointments Yet
            </h3>
            <p className="text-gray-400 text-sm">
              You haven't booked any appointments yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Doctor name */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-dark-800">
                      {booking.doctorName}
                    </h3>
                    <span className="inline-block bg-primary-50 text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded-full mt-1">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(booking)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary-500 shrink-0" />
                    <span>{booking.patientName} ({booking.gender})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-primary-500 shrink-0" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-primary-500 shrink-0" />
                    <span>{booking.appointmentDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary-500 shrink-0" />
                    <span>{booking.appointmentTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-dark-800">
                Update Appointment
              </h2>
              <button
                onClick={() => setEditModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              {/* Readonly fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Doctor</label>
                <input
                  type="text"
                  value={selected.doctorName}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="text"
                  value={selected.userEmail}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                />
              </div>

              {/* Editable fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient Name</label>
                <input
                  type="text"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={form.appointmentDate}
                    onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                  <input
                    type="text"
                    value={form.appointmentTime}
                    onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;