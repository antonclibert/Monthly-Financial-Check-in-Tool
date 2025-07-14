
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">Financial Check-in Tool</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/setup-reminder" className="text-blue-600 hover:text-blue-800 transition-colors">
              Set Up Reminder
            </Link>
            <Link to="/help" className="text-blue-600 hover:text-blue-800 transition-colors">
              Help Guide
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Financial Check-in Tool. Open source project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
