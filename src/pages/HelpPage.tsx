import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle, ListChecks } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl mx-auto mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/setup-reminder">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reminder Setup
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How to Set Up Your Monthly Financial Check-in
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mt-1">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Step 1: Select Your Birthday</h3>
                <p className="text-gray-600">
                  On the main reminder setup page, you'll see a date picker.
                  Click on it and select your birth date. We use the day of your birth for your monthly financial check-in.
                  For example, if you were born on the 15th of May, your financial check-ins will be scheduled for the 15th of every month.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full mt-1">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Step 2: Confirm and Continue</h3>
                <p className="text-gray-600">
                  Once you've selected your birthday, you'll see a confirmation of the monthly check-in day.
                  If it looks correct, click the "Continue to Calendar Selection" button.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mt-1">
                <ListChecks className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Step 3: Add to Your Calendar</h3>
                <p className="text-gray-600">
                  You'll be taken to a page with several calendar options (Google, Apple, Outlook, etc.).
                  Each calendar platform will have two buttons: "Copy Link" and "Open".
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 pl-4">
                  <li><strong>Copy Link:</strong> Copies a special link to your clipboard. You can then manually add this event to your calendar.</li>
                  <li><strong>Open:</strong> Attempts to directly open the event in your selected calendar application or web service.</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Choose your preferred calendar and follow the prompts to add the recurring monthly financial check-in.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/setup-reminder">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back and Set Up Reminder
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
