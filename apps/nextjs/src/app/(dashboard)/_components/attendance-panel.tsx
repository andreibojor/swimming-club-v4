"use client";

import { ScrollArea } from "@acme/ui";

import { AttendanceCard } from "./attendance-card";

export function AttendancePanel({ students }) {
  return (
    <>
      <ScrollArea className="h-[555px]">
        {students?.map((student) => (
          <AttendanceCard key={student.id} student={student} />
        ))}
      </ScrollArea>
    </>
  );
}
