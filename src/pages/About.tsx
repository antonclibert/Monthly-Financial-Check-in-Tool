
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Heart, Code, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About This Project
          </h1>
          
          <div className="grid gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                  Why This Tool Exists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Personal financial health requires regular check-ins, but it's easy to forget or procrastinate. 
                  By linking financial reviews to your birthday each month, this tool creates a memorable, 
                  personal connection that makes it easier to maintain consistent financial habits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-blue-500" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Frontend:</strong>
                    <ul className="mt-1 text-gray-600">
                      <li>React + TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>shadcn/ui components</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Build Tools:</strong>
                    <ul className="mt-1 text-gray-600">
                      <li>Vite</li>
                      <li>React Router</li>
                      <li>Lucide Icons</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Features:</strong>
                    <ul className="mt-1 text-gray-600">
                      <li>Calendar integration</li>
                      <li>Date handling</li>
                      <li>Responsive design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  Created by Anton Ranasinghe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  This project was created as an open-source contribution to help people maintain better financial habits. 
                  Feel free to use, modify, and contribute to this project.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com/antonclibert/Monthly-Financial-Check-in-Tool" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Project Repository
                    </Button>
                  </a>
                  <a href="https://anton-ranasinghe.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Portfolio
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Contributing</h2>
            <p className="text-gray-600 text-center mb-6">
              This is an open-source project and contributions are welcome! Whether it's bug fixes, 
              new features, or documentation improvements.
            </p>
            <div className="text-center">
              <a href="https://github.com/antonclibert/Monthly-Financial-Check-in-Tool" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute on GitHub
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

export default About;
