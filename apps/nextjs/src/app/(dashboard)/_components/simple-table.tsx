"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import getPresentDate from "@/actions/getPresentDate";
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

import { LikeButton } from "./like-button";

export function SimpleTable({ data, attendance }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const date = getPresentDate();

  // Initialize an array of student IDs that have attended
  const attendedStudents = attendance.map((record) => record.student_id);

  const handleAttendance = async (studentId: string, isChecked: boolean) => {
    // Insert a new attendance record
    if (!isChecked) {
      await supabase
        .from("attendance_record")
        .insert({
          date: date,
          student_id: studentId,
          attendance: true,
        })
        .then((result) => console.log(result));
    } else {
      // Delete the attendance record for the student
      await supabase
        .from("attendance_record")
        .delete()
        .match({ date: date, student_id: studentId })
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
            <TableCell>
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
            <TableCell>6 / 25</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
