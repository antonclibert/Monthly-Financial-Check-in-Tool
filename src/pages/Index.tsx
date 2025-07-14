
import { Button } from "@/components/ui/button";
import { Calendar, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-3xl w-full px-4 py-16 text-center">
        <div className="mb-8 inline-flex p-4 bg-blue-100 rounded-full">
          <Calendar className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Monthly Financial Check-in
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Set up a recurring monthly reminder on your birthday date each month to review your finances with our free templates.
        </p>
        
        <Link to="/setup-reminder">
          <Button className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-xl">
            <Calendar className="mr-2 h-5 w-5" />
            Set Up Monthly Reminder
          </Button>
        </Link>
      </div>
      
      <div className="w-full max-w-3xl px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Birthday-Based Reminders" 
            description="Schedule your financial check-in on the same day as your birthday each month"
            icon={<Gift className="h-8 w-8 text-blue-500 mb-3" />}
          />
          <FeatureCard 
            title="Free Templates" 
            description="Access our ready-to-use financial check-in templates for each review"
            icon={<Calendar className="h-8 w-8 text-blue-500 mb-3" />}
          />
          <FeatureCard 
            title="Multiple Calendar Options" 
            description="Add to Google Calendar, Apple Calendar, Outlook, and more"
            icon={<Calendar className="h-8 w-8 text-blue-500 mb-3" />}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
    {icon}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
