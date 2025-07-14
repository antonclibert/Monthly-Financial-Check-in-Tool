
import React from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">Financial Check-in Tool</h2>
            <p className="text-sm text-gray-600">Open source financial reminder tool</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <Link to="/setup-reminder" className="text-blue-600 hover:text-blue-800 transition-colors">
              Set Up Reminder
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
              About
            </Link>
            <Link to="/help" className="text-blue-600 hover:text-blue-800 transition-colors">
              Help Guide
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Created by Anton Ranasinghe. Open source project.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/antonclibert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://anton-ranasinghe.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Portfolio"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
