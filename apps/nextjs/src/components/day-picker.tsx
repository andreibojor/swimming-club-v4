"use client";

import React, { useCallback } from "react";
import { useDate, type DateInterface } from "@/hooks/useDate";
import { format } from "date-fns";

import { Calendar } from "@acme/ui";

export function CustomCalendar() {
  const { date, setDateState }: DateInterface = useDate();

  const handleSelectedDayChange = useCallback(
    (day: Date | undefined) => {
      setDateState(day);
    },
    [setDateState],
  );

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelectedDayChange}
        className="rounded-md border"
      />
      <div>
        <h1>
          {date ? (
            <p>You selected {format(date, "PPP")}.</p>
          ) : (
            <p>Select a day</p>
          )}
        </h1>
      </div>
    </>
  );
}
