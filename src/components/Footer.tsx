
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <a href="https://www.profitcloud.online" className="mb-4 md:mb-0">
            <img src="https://static.wixstatic.com/media/9acbdd_62d77be812cf4ac49e9cdc699bc4a936~mv2.png" alt="PROFIT CLOUD" className="h-10 object-contain rounded-lg" />
          </a>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/setup-reminder" className="text-blue-600 hover:text-blue-800 transition-colors">
              Set Up Reminder
            </Link>
            <Link to="/help" className="text-blue-600 hover:text-blue-800 transition-colors">
              Help Guide
            </Link>
            <a href="https://www.profitcloud.online/contact-us" className="text-blue-600 hover:text-blue-800 transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Profit Cloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
