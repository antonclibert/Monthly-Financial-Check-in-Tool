
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-md py-4 px-4 w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Financial Check-in</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              size="sm"
            >
              Home
            </Button>
          </Link>
          <Link to="/setup-reminder">
            <Button 
              variant={isActive("/setup-reminder") ? "default" : "ghost"} 
              size="sm"
            >
              Setup
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              variant={isActive("/about") ? "default" : "ghost"} 
              size="sm"
            >
              About
            </Button>
          </Link>
          <Link to="/help">
            <Button 
              variant={isActive("/help") ? "default" : "ghost"} 
              size="sm"
            >
              Help
            </Button>
          </Link>
        </nav>
        
        {/* Mobile menu button - simplified for now */}
        <div className="md:hidden">
          <Link to="/setup-reminder">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Setup
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
