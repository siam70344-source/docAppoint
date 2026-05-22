import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | DocAppoint</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 404 */}
          <div className="relative mb-8">
            <p className="text-[150px] font-display font-bold text-primary-100 leading-none select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-3xl shadow-lg px-8 py-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🏥</span>
                </div>
                <h1 className="font-display font-bold text-2xl text-dark-800 mb-1">
                  Page Not Found
                </h1>
                <p className="text-gray-500 text-sm">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
            >
              <FiHome />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-medium px-6 py-3 rounded-xl transition-all"
            >
              <FiArrowLeft />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;