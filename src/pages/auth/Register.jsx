import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", photoURL: "", password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = (password) => {
    const errs = {};
    if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(password))
      errs.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      errs.password = "Password must contain at least one lowercase letter";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate(form.password);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await registerUser(form.email, form.password);
      await updateUserProfile(form.name, form.photoURL);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Registered with Google!");
      navigate("/");
    } catch {
      toast.error("Google signup failed. Try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register — DocAppoint</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="font-display text-xl font-bold text-dark-800">
                  Doc<span className="text-primary-600">Appoint</span>
                </span>
              </Link>
              <h1 className="text-2xl font-display font-bold text-dark-800 mb-1">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Join DocAppoint and book appointments easily
              </p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 mb-6"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-6">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Photo URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="photoURL"
                    value={form.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 chars, upper & lowercase"
                    required
                    className={`w-full pl-10 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 text-sm transition-all
                      ${errors.password ? "border-red-400" : "border-gray-200"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;Register;