"use client";

import React, { useCallback } from "react";
import { useDate, type DateInterface } from "@/hooks/useDate";

import { Calendar } from "@acme/ui";

export function CustomCalendar() {
  const { date, setDateState }: DateInterface = useDate();

  const handleSelectedDayChange = useCallback(
    (day: Date | undefined) => {
      if (date && day && date.getTime() === day.getTime()) {
        // If the selected date is the same as the current date, do nothing
        return;
      }
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
        // className="rounded-md border"
      />
    </>
  );
}
