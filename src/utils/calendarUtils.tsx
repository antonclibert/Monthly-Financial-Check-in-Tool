import React from 'react';
import { Download } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';

// Define the Australian timezone
const TIMEZONE = 'Australia/Sydney';

interface CalendarEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  allDay?: boolean;
  location?: string;
  recurrence?: string;
}

export interface CalendarPlatform {
  name: string;
  icon: string; // Kept for potential other uses
  logo?: React.ReactNode; // This is what we're modifying
  color: string;
  generateUrl: (event: CalendarEvent) => string;
}

// Format a date as YYYYMMDD in Australian timezone
const formatDateYYYYMMDD = (date: Date): string => {
  const formattedDate = formatInTimeZone(date, TIMEZONE, 'yyyyMMdd');
  return formattedDate;
};

// Format a date as YYYYMMDDTHHMMSS in Australian timezone
const formatDateYYYYMMDDTHHMMSS = (date: Date): string => {
  const formattedDate = formatInTimeZone(date, TIMEZONE, "yyyyMMdd'T'HHmmss");
  return formattedDate;
};

export const calendarPlatforms: CalendarPlatform[] = [
  {
    name: "Google Calendar",
    icon: "google",
    logo: <img src="https://img.icons8.com/color/48/google-calendar--v2.png" alt="Google Calendar" className="h-5 w-5" />,
    color: "#4285F4", // Google blue
    generateUrl: (event: CalendarEvent): string => {
      const startDate = event.allDay 
        ? formatDateYYYYMMDD(event.startDate) 
        : formatDateYYYYMMDDTHHMMSS(event.startDate);
      
      const endDate = event.endDate 
        ? (event.allDay 
          ? formatDateYYYYMMDD(event.endDate) 
          : formatDateYYYYMMDDTHHMMSS(event.endDate))
        : startDate;
        
      const url = new URL("https://calendar.google.com/calendar/render");
      url.searchParams.append("action", "TEMPLATE");
      url.searchParams.append("text", event.title);
      
      if (event.description) {
        url.searchParams.append("details", event.description);
      }
      
      url.searchParams.append("dates", `${startDate}/${endDate}`);
      
      if (event.location) {
        url.searchParams.append("location", event.location);
      }
      
      if (event.recurrence) {
        url.searchParams.append("recur", event.recurrence);
      }
      
      return url.toString();
    }
  },
  {
    name: "Apple Calendar",
    icon: "apple",
    logo: <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple Calendar" className="h-5 w-5" />, 
    color: "#000000", // Apple black
    generateUrl: (event: CalendarEvent): string => {
      // Apple Calendar uses the ics format
      const startDate = formatDateYYYYMMDDTHHMMSS(event.startDate);
      const endDate = event.endDate 
        ? formatDateYYYYMMDDTHHMMSS(event.endDate) 
        : formatDateYYYYMMDDTHHMMSS(new Date(event.startDate.getTime() + 60 * 60 * 1000)); // Default to 1 hour
      
      const url = new URL("data:text/calendar;charset=utf8,");
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${event.title}`,
        event.description ? `DESCRIPTION:${event.description}` : "",
        event.location ? `LOCATION:${event.location}` : "",
        "END:VEVENT",
        "END:VCALENDAR"
      ].filter(Boolean).join("\n");
      
      return encodeURI(`webcal://ical.to/ical/${btoa(icsContent)}`);
    }
  },
  {
    name: "Outlook",
    icon: "microsoft",
    logo: <img src="https://img.icons8.com/color/48/outlook-calendar.png" alt="Outlook" className="h-5 w-5" />,
    color: "#0078D4", // Microsoft blue
    generateUrl: (event: CalendarEvent): string => {
      // Outlook Web uses similar format to Google
      const startDate = event.allDay 
        ? formatDateYYYYMMDD(event.startDate) 
        : formatDateYYYYMMDDTHHMMSS(event.startDate);
      
      const endDate = event.endDate 
        ? (event.allDay 
          ? formatDateYYYYMMDD(event.endDate) 
          : formatDateYYYYMMDDTHHMMSS(event.endDate))
        : formatDateYYYYMMDDTHHMMSS(new Date(event.startDate.getTime() + 60 * 60 * 1000)); // Default to 1 hour
          
      const url = new URL("https://outlook.live.com/calendar/0/action/compose");
      url.searchParams.append("rru", "addevent");
      url.searchParams.append("subject", event.title);
      
      if (event.description) {
        url.searchParams.append("body", event.description);
      }
      
      url.searchParams.append("startdt", startDate);
      url.searchParams.append("enddt", endDate);
      
      if (event.location) {
        url.searchParams.append("location", event.location);
      }
      
      if (event.allDay) {
        url.searchParams.append("allday", "true");
      }
      
      return url.toString();
    }
  },
  {
    name: "Yahoo Calendar",
    icon: "yahoo",
    logo: <img src="https://img.icons8.com/color/48/yahoo--v2.png" alt="Yahoo" className="h-5 w-5" />,
    color: "#6001D2", // Yahoo purple
    generateUrl: (event: CalendarEvent): string => {
      // Yahoo Calendar format
      const formatYahooDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}00`;
      };
      
      const startDate = formatYahooDate(event.startDate);
      let endDate = event.endDate 
        ? formatYahooDate(event.endDate) 
        : formatYahooDate(new Date(event.startDate.getTime() + 60 * 60 * 1000));
      
      const url = new URL("https://calendar.yahoo.com/");
      url.searchParams.append("v", "60");
      url.searchParams.append("view", "d");
      url.searchParams.append("type", "20");
      url.searchParams.append("title", event.title);
      
      if (event.description) {
        url.searchParams.append("desc", event.description);
      }
      
      url.searchParams.append("st", startDate);
      url.searchParams.append("et", endDate);
      
      if (event.location) {
        url.searchParams.append("in_loc", event.location);
      }
      
      return url.toString();
    }
  },
  {
    name: "iCalendar File (.ics)",
    icon: "download",
    logo: <Download className="h-5 w-5 text-gray-700" />,
    color: "#5F6368", // Generic dark gray
    generateUrl: (event: CalendarEvent): string => {
      // Generate ICS file content
      const formatICSDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
      };
      
      const startDate = formatICSDate(event.startDate);
      const endDate = event.endDate 
        ? formatICSDate(event.endDate) 
        : formatICSDate(new Date(event.startDate.getTime() + 60 * 60 * 1000));
      
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${event.title}`,
        event.description ? `DESCRIPTION:${event.description}` : "",
        event.location ? `LOCATION:${event.location}` : "",
        "END:VEVENT",
        "END:VCALENDAR"
      ].filter(Boolean).join("\r\n");
      
      return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
    }
  }
];

// Template descriptions
const templateDescriptions = {
  basic: "Monthly Financial Check-in\n\n" +
    "1. Review income and expenses\n" +
    "2. Check monthly budget adherence\n" +
    "3. Update financial goals\n\n" +
    "Use this time to review your financial progress and make adjustments as needed.",
  
  comprehensive: "Comprehensive Financial Review\n\n" +
    "1. Income and expense analysis\n" +
    "2. Investment portfolio review\n" +
    "3. Retirement savings progress\n" +
    "4. Debt reduction plan\n" +
    "5. Emergency fund status\n\n" +
    "Take a comprehensive look at all aspects of your financial health.",
  
  business: "Business Financial Review\n\n" +
    "1. Monthly profit/loss analysis\n" +
    "2. Cash flow statement\n" +
    "3. Accounts receivable/payable\n" +
    "4. Tax planning\n" +
    "5. Business expense review\n\n" +
    "Review your business financial performance and plan for the upcoming month."
};

export function getFinancialCheckInReminder(
  birthDate: Date, 
  templateId: string = 'basic',
  clientName?: string
): CalendarEvent {
  // Create a date for this month's check-in using the day from birthDate
  const today = new Date();
  
  // Extract the day from the birthDate correctly
  const birthDay = birthDate.getDate();
  
  // Create the check-in date in Australian timezone
  const thisMonthCheckIn = new Date(
    today.getFullYear(),
    today.getMonth(),
    birthDay
  );
  
  // If this month's date has passed, move to next month
  if (thisMonthCheckIn < today) {
    thisMonthCheckIn.setMonth(thisMonthCheckIn.getMonth() + 1);
  }
  
  const title = clientName 
    ? `${clientName}'s Monthly Financial Check-in` 
    : "Monthly Financial Check-in";
  
  const description = templateDescriptions[templateId as keyof typeof templateDescriptions] || templateDescriptions.basic;
  
  // Set it for all day
  return {
    title,
    description,
    startDate: thisMonthCheckIn,
    allDay: true,
    recurrence: "RRULE:FREQ=MONTHLY"  // Monthly recurring event
  };
}

export function getBirthdayReminder(birthDate: Date, name?: string): CalendarEvent {
  // Get this year's date for the birthday 
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  
  // If birthday already happened this year, use next year
  const nextBirthday = thisYearBirthday < today 
    ? new Date(
        today.getFullYear() + 1,
        birthDate.getMonth(),
        birthDate.getDate()
      )
    : thisYearBirthday;
  
  // Calculate age they will be turning
  const age = nextBirthday.getFullYear() - birthDate.getFullYear();
  
  const title = name 
    ? `${name}'s Birthday (Turning ${age})` 
    : `Birthday Reminder (Turning ${age})`;
  
  const description = name
    ? `Reminder: ${name} is turning ${age} today!`
    : `Birthday Reminder: Turning ${age} today!`;
  
  // Set it for all day
  return {
    title,
    description,
    startDate: nextBirthday,
    allDay: true,
    recurrence: "RRULE:FREQ=YEARLY"  // Yearly recurring event
  };
}
