"use client";

import { StudentCard } from "./student-card";

export function AttendancePanel({ students }) {
  return (
    <>
      {students?.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </>
  );
}
