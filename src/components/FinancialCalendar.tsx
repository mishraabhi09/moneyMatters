import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Flame } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FinancialCalendar: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [streak, setStreak] = useState(0);
  
  // Get check-in dates from localStorage
  const getCheckInDates = () => {
    const dates = [];
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    
    while (startOfYear <= currentDate) {
      const dateString = startOfYear.toDateString();
      if (localStorage.getItem('lastCheckIn') === dateString) {
        dates.push(new Date(dateString));
      }
      startOfYear.setDate(startOfYear.getDate() + 1);
    }
    return dates;
  };

  // Calculate streak
  useEffect(() => {
    const calculateStreak = () => {
      let currentStreak = 0;
      const today = new Date().toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();

      if (localStorage.getItem('lastCheckIn') === today) {
        currentStreak = parseInt(localStorage.getItem('streak') || '1', 10);
      } else if (localStorage.getItem('lastCheckIn') === yesterdayString) {
        currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);
      } else {
        localStorage.setItem('streak', '0');
      }

      setStreak(currentStreak);
    };

    calculateStreak();
  }, []);

  const checkInDates = getCheckInDates();

  const tileClassName = ({ date }: { date: Date }) => {
    const classes = [];
    
    // Check if date is checked in
    if (checkInDates.some(checkInDate => 
      checkInDate.toDateString() === date.toDateString()
    )) {
      classes.push('checked-in-day');
    }

    // Check if date is today
    if (date.toDateString() === new Date().toDateString()) {
      classes.push('today');
    }

    // Check if date is in the future
    if (date > new Date()) {
      classes.push('future-date');
    }

    return classes.join(' ');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" />
              Check-in Calendar
            </CardTitle>
            <CardDescription>Track your daily financial check-ins</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            {streak} Day{streak !== 1 ? 's' : ''} Streak
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="calendar-wrapper">
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            className="w-full border-none"
            minDetail="month"
            maxDetail="month"
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date()}
          />
        </div>
        <style jsx>{`
          .calendar-wrapper :global(.react-calendar) {
            border: none;
            background: transparent;
            font-family: inherit;
            width: 100%;
          }
          .calendar-wrapper :global(.react-calendar__navigation) {
            margin-bottom: 1rem;
          }
          .calendar-wrapper :global(.react-calendar__navigation button) {
            min-width: 44px;
            background: none;
            font-size: 16px;
            color: var(--foreground);
          }
          .calendar-wrapper :global(.react-calendar__navigation button:enabled:hover),
          .calendar-wrapper :global(.react-calendar__navigation button:enabled:focus) {
            background-color: var(--primary-50);
            border-radius: 8px;
          }
          .calendar-wrapper :global(.react-calendar__month-view__weekdays) {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.75em;
            color: var(--muted-foreground);
            margin-bottom: 0.5rem;
          }
          .calendar-wrapper :global(.react-calendar__month-view__days__day) {
            padding: 8px;
            color: var(--foreground);
          }
          .calendar-wrapper :global(.react-calendar__tile) {
            padding: 0.75em 0.5em;
            border-radius: 8px;
            font-weight: 500;
          }
          .calendar-wrapper :global(.checked-in-day) {
            background: var(--primary-100);
            color: var(--primary);
            position: relative;
          }
          .calendar-wrapper :global(.checked-in-day::after) {
            content: '✓';
            position: absolute;
            top: 2px;
            right: 2px;
            font-size: 8px;
            color: var(--primary);
          }
          .calendar-wrapper :global(.today) {
            border: 2px solid var(--primary);
            font-weight: bold;
          }
          .calendar-wrapper :global(.future-date) {
            color: var(--muted-foreground);
            opacity: 0.5;
          }
          .calendar-wrapper :global(.react-calendar__tile:enabled:hover) {
            background: var(--primary-50);
            color: var(--primary);
          }
          .calendar-wrapper :global(.react-calendar__tile--now) {
            background: transparent;
          }
          .calendar-wrapper :global(.react-calendar__month-view__days__day--neighboringMonth) {
            color: var(--muted-foreground);
            opacity: 0.3;
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default FinancialCalendar; 