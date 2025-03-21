
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-logistics-50 p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-logistics-200 p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-logistics-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-logistics-danger" />
        </div>
        <h1 className="text-3xl font-semibold text-logistics-900 mb-3">Page Not Found</h1>
        <p className="text-logistics-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-5 py-3 bg-logistics-accent text-white rounded-md hover:bg-logistics-accent/90 transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
