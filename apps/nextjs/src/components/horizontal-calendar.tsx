"use client";

import * as React from "react";
import { useStore } from "@/store/store";

import { Calendar } from "@acme/ui";

export function CustomCalendar() {
  const date = useStore.getState().date;
  const setDate = useStore.setState().date;
  return (
    <>
      <h1>{console.log(date)}</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </>
  );
}
