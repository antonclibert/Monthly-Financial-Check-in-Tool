
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import DatePicker from "@/components/DatePicker";
import CalendarLinkGenerator from "@/components/CalendarLinkGenerator";
import { calendarPlatforms, getFinancialCheckInReminder } from "@/utils/calendarUtils";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SetupReminder = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Function to handle birth date processing
  const processBirthDate = (dateString: string) => {
    try {
      // Parse the date from parameter (format should be YYYY-MM-DD)
      const parsedDate = new Date(dateString);
      
      // Check if the date is valid
      if (!isNaN(parsedDate.getTime())) {
        setBirthDate(parsedDate);
        
        toast({
          title: "Birth date detected",
          description: "Your birth date was automatically filled from the provided data"
        });
      }
    } catch (error) {
      console.error("Failed to parse birth date:", error);
    }
  };
  
  // Parse URL parameters on component mount
  useEffect(() => {
    // Try to get the birth date from URL params
    const birthDateParam = searchParams.get('birthDate');
    
    if (birthDateParam) {
      processBirthDate(birthDateParam);
    }
  }, [searchParams, toast]);
  
  // Listen for postMessage events (for iframe embedding)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // In production, add origin validation for security
      // if (event.origin !== "https://trusted-origin.com") return;
      
      // Check if message is our custom type
      if (event.data?.type === 'SETUP_DATA') {
        console.log("Received setup data via postMessage:", event.data);
        
        if (event.data.birthDate) {
          processBirthDate(event.data.birthDate);
        }
      }
    };
    
    // Add event listener
    window.addEventListener('message', handleMessage);
    
    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleContinue = () => {
    if (birthDate) {
      toast({
        title: "Monthly reminder setup",
        description: `Setting up monthly financial check-in on day ${birthDate.getDate()} of each month (Australia/Sydney timezone)`
      });
      setStep(2);
    }
  };

  const financialReminder = birthDate ? getFinancialCheckInReminder(birthDate) : null;
  
  const getEventUrl = (platform: typeof calendarPlatforms[0]) => {
    if (!birthDate || !financialReminder) return "";
    return platform.generateUrl(financialReminder);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl">
          {/* Page Title and Help Link */}
          <div className="mb-8 text-center relative">
            <h1 className="text-3xl font-bold">Set Up Monthly Financial Check-in</h1>
            <p className="text-gray-600 mt-2">Keep track of your finances with monthly reminders</p>
            
            <Link to="/help" className="absolute top-1 right-1">
              <Button variant="link" className="text-sm text-gray-600 hover:text-primary px-3 py-1 h-auto" aria-label="Help Guide">
                Help Guide
              </Button>
            </Link>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1 mb-12 rounded overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300 ease-in-out" 
              style={{
                width: step === 1 ? "50%" : "100%"
              }}
            ></div>
          </div>

          {step === 1 ? (
            <div className="space-y-8 bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-800">Birthday-Based Financial Check-in</h2>
                  <p className="text-gray-600">
                    We'll create monthly reminders on the same day as your birthday
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <DatePicker 
                  date={birthDate} 
                  onChange={setBirthDate} 
                  label="Select Your Birthday" 
                  isBirthday={true} 
                />
                
                {birthDate && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Monthly Check-in Day: </span> 
                      You'll receive reminders on day {birthDate.getDate()} of each month
                    </p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleContinue} 
                disabled={!birthDate} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Continue to Calendar Selection
              </Button>
            </div>
          ) : (
            <div className="space-y-8 bg-white p-8 rounded-xl shadow-md">
              {birthDate && (
                <div>
                  <div className="flex items-center space-x-4 mb-6 bg-blue-50 p-4 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="text-blue-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Monthly Financial Check-in</h3>
                      <p className="text-sm text-gray-500">
                        Recurring on day {birthDate.getDate()} of each month
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-4">Add to Your Calendar</h2>
                  <p className="text-gray-600 mb-6">
                    Select your preferred calendar application to set up your monthly financial check-in reminder.
                  </p>

                  <CalendarLinkGenerator platforms={calendarPlatforms} eventUrl={getEventUrl} />
                </div>
              )}

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="w-full"
                >
                  Go Back to Edit Birthday
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SetupReminder;
