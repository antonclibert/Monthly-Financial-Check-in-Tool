
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-4 w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {/* Left section - empty for balance */}
        </div>
        
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-gray-800">Financial Check-in</h1>
        </div>
        
        <div className="flex-1 flex justify-end">
          {/* Right section - empty for balance */}
        </div>
      </div>
    </header>
  );
};

export default Header;
