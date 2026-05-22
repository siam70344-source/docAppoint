import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed. Try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login — DocAppoint</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Card */}
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
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">
                Sign in to manage your appointments
              </p>
            </div>

            {/* Google button */}
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
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;