"use client";

import { useState, useEffect } from "react";

export default function DateTimeDisplay() {
  // Initialize the state with the current date and time rounded to the nearest minute
  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0); // Set seconds and milliseconds to 0
    return now;
  });

  useEffect(() => {
    // Calculate the delay until the start of the next minute
    const now = new Date();
    const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    // Set a timeout to update the time at the start of the next minute
    const timeoutId = setTimeout(() => {
      setCurrentDateTime(new Date());
      // Then update the time every minute
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 60000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }, delay);

    // Clear the timeout if the component unmounts before it finishes
    return () => clearTimeout(timeoutId);
  }, []);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold lg:text-7xl">
        {formatTime(currentDateTime)}
      </h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
        {formatDate(currentDateTime)}
      </p>
    </div>
  );
}
