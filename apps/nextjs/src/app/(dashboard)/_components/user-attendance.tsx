"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Switch } from "@acme/ui";

export function UserAttendance({ data, attendance }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  //   useEffect(() => {
  //     const channel = supabase
  //       .channel("realtime attendance")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*",
  //           schema: "public",
  //           table: "attendance_record",
  //         },
  //         () => {
  //           router.refresh();
  //         },
  //       )
  //       .subscribe();

  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [supabase, router]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Initialize an array of student IDs that have attended
  const attendedStudents = attendance.map((record) => record.student_id);

  const handleAttendance = async (studentId: string, isChecked: boolean) => {
    // Insert a new attendance record
    if (!isChecked) {
      await supabase
        .from("attendance_record")
        .insert({
          date: formattedDate,
          student_id: studentId,
          attendance: true,
        })
        .then((result) => console.log(result));
    } else {
      // Delete the attendance record for the student
      await supabase
        .from("attendance_record")
        .delete()
        .match({ date: formattedDate, student_id: studentId })
        .then((result) => console.log(result));
    }
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {data?.map((student) => (
        <div key={student.id} className="flex">
          <h1>{student.full_name}</h1>
          <Switch
            onClick={() =>
              handleAttendance(
                student.id,
                attendedStudents.includes(student.id),
              )
            }
            checked={attendedStudents.includes(student.id)}
          />
        </div>
      ))}
    </div>
  );
}