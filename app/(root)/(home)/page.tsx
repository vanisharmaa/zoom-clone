"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import React, { useEffect, useMemo, useState } from "react";
import DateAndTime from "@/components/DateAndTime";

const Home = () => {
  const now = useMemo(() => new Date(), []);
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  const [upcomingTime, setUpcomingTime] = useState<string | null>(null);

  const { upcomingCalls } = useGetCalls();
  useEffect(() => {
    function isToday(date: Date) {
      const today = new Date();

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }

    function formatTime(date: Date) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (upcomingCalls && upcomingCalls.length >= 1) {
      const firstUpcoming = upcomingCalls[0].state.startsAt;

      if (isToday(firstUpcoming!)) {
        const time = formatTime(firstUpcoming!);
        setUpcomingTime(time);
      }
    }
  }, [upcomingCalls]);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {upcomingTime && (
            <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at: {upcomingTime}
            </h2>
          )}
          <DateAndTime />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
