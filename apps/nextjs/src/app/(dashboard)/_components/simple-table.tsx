"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui";

export function SimpleTable({ data, attendance }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

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
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.full_name}</TableCell>
            <TableCell>
              <Avatar className="h-9 w-9">
                <AvatarImage src={student.avatar_url} alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                onClick={() =>
                  handleAttendance(
                    student.id,
                    attendedStudents.includes(student.id),
                  )
                }
                checked={attendedStudents.includes(student.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
