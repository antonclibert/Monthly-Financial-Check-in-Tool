
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-4 w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {/* Left section - empty for balance */}
        </div>
        
        <a 
          href="https://www.profitcloud.online" 
          className="flex-1 flex justify-center items-center transition-transform hover:scale-105"
          aria-label="Profit Cloud Website"
        >
          <img 
            src="https://static.wixstatic.com/media/9acbdd_62d77be812cf4ac49e9cdc699bc4a936~mv2.png" 
            alt="PROFIT CLOUD" 
            className="h-14 object-contain rounded-lg" 
          />
        </a>
        
        <div className="flex-1 flex justify-end">
          <Button 
            variant="outline" 
            className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50"
            onClick={() => window.location.href = 'https://calendly.com/profitcloud/30min'}
          >
            Free Consultation
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
