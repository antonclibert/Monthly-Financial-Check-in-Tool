
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, Users, CheckCircle, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-8 inline-flex p-4 bg-blue-100 rounded-full">
            <Calendar className="w-12 h-12 text-blue-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Monthly Financial Check-in Tool
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Set up recurring monthly reminders on your birthday date to review your finances. 
            Completely free and open source.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/setup-reminder">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Calendar className="mr-2 h-5 w-5" />
                Set Up Your Reminder
              </Button>
            </Link>
            
            <a href="https://github.com/antonclibert" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard 
              title="Birthday-Based Reminders" 
              description="Schedule your financial check-in on the same day as your birthday each month for easy remembering"
              icon={<Gift className="h-10 w-10 text-blue-500" />}
            />
            <FeatureCard 
              title="Multiple Calendar Support" 
              description="Add to Google Calendar, Apple Calendar, Outlook, Yahoo Calendar, and more platforms"
              icon={<Calendar className="h-10 w-10 text-blue-500" />}
            />
            <FeatureCard 
              title="Open Source & Free" 
              description="Completely free to use with no hidden costs. Open source code available on GitHub"
              icon={<CheckCircle className="h-10 w-10 text-blue-500" />}
            />
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StepCard 
                step="1"
                title="Select Birthday"
                description="Choose your birth date using our date picker"
              />
              <StepCard 
                step="2"
                title="Confirm Day"
                description="We'll use the day of your birthday for monthly reminders"
              />
              <StepCard 
                step="3"
                title="Add to Calendar"
                description="Select your preferred calendar platform"
              />
              <StepCard 
                step="4"
                title="Stay on Track"
                description="Receive monthly reminders to review your finances"
              />
            </div>
          </div>

          {/* Author Credit Section */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Created by Anton Ranasinghe</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This open-source financial check-in tool was created to help people stay on top of their financial health 
              with simple, recurring reminders. Feel free to contribute or fork the project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/antonclibert" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Profile
                </Button>
              </a>
              <a href="https://anton-ranasinghe.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Portfolio
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
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
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ 
  step, 
  title, 
  description 
}: { 
  step: string; 
  title: string; 
  description: string;
}) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
      {step}
    </div>
    <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default Index;
