"use client";

import * as React from "react";
import { useState } from "react";
import { useDate } from "@/store/store";
import { format } from "date-fns";

import { Calendar } from "@acme/ui";

export function CustomCalendar() {
  const today = new Date();
  const newDate = useDate();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

  React.useEffect(() => {
    newDate.setNewDate(selectedDay);
  }, [selectedDay]);

  return (
    <>
      <Calendar
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        className="rounded-md border"
      />
      <div>
        <h1>
          {newDate.date ? (
            <p>You selected {format(newDate.date, "PPP")}.</p>
          ) : (
            <p>select a day</p>
          )}
        </h1>
      </div>
    </>
  );
}
