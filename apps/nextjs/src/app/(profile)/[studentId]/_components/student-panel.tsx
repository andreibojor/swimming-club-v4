"use client";

import SubscribeButton from "@/components/subscribe-button";

import { Calendar } from "@acme/ui";

export default function StudentPanel({ dates, products, allStudentDetails }) {
  return (
    <>
      <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
        {/* <AttendancePieChart attendancesLeft={3} /> */}
        <Calendar mode="multiple" selected={dates} />
      </div>
      <SubscribeButton
        products={products}
        swimmerLevel={allStudentDetails?.swimmer_level}
        studentIdStripe={allStudentDetails?.id}
      />
    </>
  );
}
