import * as React from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
interface DatePickerProps {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  isBirthday?: boolean;
}
export function DatePicker({
  date,
  onChange,
  label = "Select date",
  placeholder = "Pick a date",
  isBirthday = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  // For dropdown selection (month and day only, use current year)
  const [selectedDay, setSelectedDay] = useState<string>(date ? date.getDate().toString() : "");
  const [selectedMonth, setSelectedMonth] = useState<string>(date ? (date.getMonth() + 1).toString() : "");

  // Generate arrays for days, months and years
  const days = Array.from({
    length: 31
  }, (_, i) => (i + 1).toString());
  const months = [{
    value: "1",
    label: "January"
  }, {
    value: "2",
    label: "February"
  }, {
    value: "3",
    label: "March"
  }, {
    value: "4",
    label: "April"
  }, {
    value: "5",
    label: "May"
  }, {
    value: "6",
    label: "June"
  }, {
    value: "7",
    label: "July"
  }, {
    value: "8",
    label: "August"
  }, {
    value: "9",
    label: "September"
  }, {
    value: "10",
    label: "October"
  }, {
    value: "11",
    label: "November"
  }, {
    value: "12",
    label: "December"
  }];

  // Use current year for monthly reminders (we only care about day/month)
  const currentYear = new Date().getFullYear();
  React.useEffect(() => {
    if (date) {
      setSelectedDay(date.getDate().toString());
      setSelectedMonth((date.getMonth() + 1).toString());
      setInputValue(format(date, "yyyy-MM-dd"));
    }
  }, [date]);

  // Separate effect to trigger onChange when dropdown values change
  React.useEffect(() => {
    if (selectedDay && selectedMonth) {
      try {
        const newDate = new Date(currentYear, parseInt(selectedMonth, 10) - 1, parseInt(selectedDay, 10));
        
        // Validate that the date is actually valid (e.g., not February 30)
        if (!isNaN(newDate.getTime()) && 
            newDate.getDate() === parseInt(selectedDay, 10) && 
            newDate.getMonth() === parseInt(selectedMonth, 10) - 1) {
          
          // Only call onChange if this is different from current date
          if (!date || 
              date.getDate() !== newDate.getDate() || 
              date.getMonth() !== newDate.getMonth()) {
            onChange(newDate);
          }
        }
      } catch (error) {
        // Silently handle invalid combinations
      }
    }
  }, [selectedDay, selectedMonth, currentYear, onChange]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputError(null);
    if (!value) {
      onChange(undefined);
      return;
    }
    try {
      // Try to parse the date from the input
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());

      // Check if the date is valid
      if (!isNaN(parsedDate.getTime())) {
        onChange(parsedDate);
      }
    } catch (error) {
      setInputError("Please use format YYYY-MM-DD");
    }
  };
  const handleDropdownChange = (type: 'day' | 'month', value: string) => {
    if (type === 'day') {
      setSelectedDay(value);
    } else if (type === 'month') {
      setSelectedMonth(value);
    }
    // Date creation and validation is now handled by useEffect
  };
  return <div className="flex flex-col space-y-2">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

      {isBirthday ? <div className="space-y-4">
          {/* Direct input option */}
          <div className="relative">
            <Input type="date" value={inputValue} onChange={handleInputChange} placeholder="YYYY-MM-DD" className={cn("w-full", inputError && "border-red-500 focus:ring-red-500")} aria-label="Enter date in YYYY-MM-DD format" />
            {inputError && <p className="mt-1 text-xs text-red-500">{inputError}</p>}
          </div>

          <div className="text-center text-sm text-gray-500">Or select from dropdowns</div>

          {/* Dropdown selection for month and day only */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select value={selectedMonth} onValueChange={value => handleDropdownChange('month', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedDay} onValueChange={value => handleDropdownChange('day', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

        </div> :
    // Standard date picker for non-birthday dates
    <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={onChange} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>}
    </div>;
}
export default DatePicker;