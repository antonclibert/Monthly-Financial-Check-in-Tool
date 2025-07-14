
import React from "react";
import { CalendarPlatform } from "@/utils/calendarUtils";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink, CircleHelp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarLinkGeneratorProps {
  platforms: CalendarPlatform[];
  eventUrl: (platform: CalendarPlatform) => string;
}

const CalendarLinkGenerator: React.FC<CalendarLinkGeneratorProps> = ({ platforms, eventUrl }) => {
  const { toast } = useToast();
  const [copiedLinks, setCopiedLinks] = React.useState<Record<string, boolean>>({});

  const handleCopyLink = (platform: CalendarPlatform) => {
    const url = eventUrl(platform);
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLinks({ ...copiedLinks, [platform.name]: true });
      toast({
        title: "Link copied!",
        description: `${platform.name} link copied to clipboard`,
      });
      
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [platform.name]: false }));
      }, 2000);
    });
  };

  const handleOpenLink = (platform: CalendarPlatform) => {
    const url = eventUrl(platform);
    window.open(url, "_blank");
  };

  const handleHelpClick = (helpUrl: string) => {
    window.open(helpUrl, "_blank");
  };

  // Official help page URLs for each platform
  const getHelpUrl = (platformName: string): string => {
    switch (platformName) {
      case "Google Calendar":
        return "https://support.google.com/calendar/answer/37111";
      case "Apple Calendar":
        return "https://support.apple.com/en-au/guide/calendar/welcome/mac";
      case "Outlook":
        return "https://support.microsoft.com/en-us/office/calendar-help-365-5bc01ce9-9e8b-4eda-9fab-9f24d1c3ee3f";
      case "Yahoo Calendar":
        return "https://help.yahoo.com/kb/calendar";
      case "iCalendar File (.ics)":
        return "https://support.apple.com/en-au/guide/calendar/icl1043/mac";
      default:
        return "#";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Choose Your Calendar Platform</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div 
            key={platform.name}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            style={{ borderLeft: `4px solid ${platform.color}` }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                {platform.logo && <span className="flex-shrink-0">{platform.logo}</span>}
                <h3 className="text-lg font-medium">{platform.name}</h3>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                      onClick={() => handleHelpClick(getHelpUrl(platform.name))}
                      aria-label={`Get help with ${platform.name}`}
                    >
                      <CircleHelp className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get help for {platform.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1"
                onClick={() => handleCopyLink(platform)}
              >
                {copiedLinks[platform.name] ? (
                  <>
                    <Check className="mr-1 h-4 w-4 text-green-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-4 w-4" /> Copy Link
                  </>
                )}
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                className="flex-1"
                onClick={() => handleOpenLink(platform)}
              >
                <ExternalLink className="mr-1 h-4 w-4" /> Open
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Tip:</span> Some calendar services might require 
          permissions to add events. If you encounter issues, try copying the link and 
          adding it manually to your calendar.
        </p>
      </div>
    </div>
  );
};

export default CalendarLinkGenerator;
