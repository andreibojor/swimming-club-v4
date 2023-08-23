"use client";

import * as React from "react";
import { useDate } from "@/store/store";

import { Calendar } from "@acme/ui";

export function CustomCalendar() {
  const selectedDate = useDate((state) => state.date);
  const setNewDate = useDate((state) => state.setNewDate);

  React.useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={() => setNewDate}
        className="rounded-md border"
      />
    </>
  );
}
