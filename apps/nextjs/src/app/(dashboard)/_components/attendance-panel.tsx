"use client";

import { AttendanceCard } from "./attendance-card";

export function AttendancePanel({ students }) {
  return (
    <>
      {students?.map((student) => (
        <AttendanceCard key={student.id} student={student} />
      ))}
    </>
  );
}
