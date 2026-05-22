import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiImage, FiEdit2, FiX } from "react-icons/fi";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState({
    name:     user?.displayName || "",
    photoURL: user?.photoURL    || "",
  });
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(form.name, form.photoURL);
      toast.success("Profile updated successfully!");
      setModalOpen(false);
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile — DocAppoint</title>
      </Helmet>

      <div className="max-w-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-dark-800">My Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=0d9260&color=fff&size=200`}
                alt={user?.displayName}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-primary-100"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${user?.displayName}&background=0d9260&color=fff&size=200`;
                }}
              />
              <span className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                <FiUser className="text-white text-xs" />
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-dark-800">
                {user?.displayName || "User"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
              <span className="inline-block bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1 rounded-full mt-2">
                Active Patient
              </span>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                <FiUser />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Full Name</p>
                <p className="text-gray-800 font-medium">{user?.displayName || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                <FiMail />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email Address</p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                <FiImage />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">Photo URL</p>
                <p className="text-gray-800 font-medium text-sm truncate">
                  {user?.photoURL || "Not set"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
          >
            <FiEdit2 />
            Update Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-dark-800">
                Update Profile
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Photo URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={form.photoURL}
                    onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm"
                  />
                </div>
              </div>

              {/* Preview */}
              {form.photoURL && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={form.photoURL}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <p className="text-xs text-gray-500">Photo preview</p>
                </div>
              )}

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

export default MyProfile;