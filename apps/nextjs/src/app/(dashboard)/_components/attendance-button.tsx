"use client";

import { useEffect, useState } from "react";
import { useDate } from "@/hooks/useDate";
import type { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

export const AttendanceButton: React.FC = ({ student }) => {
  const supabase = createClientComponentClient<Database>();
  const { date } = useDate();
  const formattedDatabaseDate = `${date.getFullYear()} ${String(
    date.getMonth() + 1,
  ).padStart(2, "0")} ${String(date.getDate()).padStart(2, "0")}`;

  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("attendance_record")
        .select("*")
        .eq("student_id", student.id)
        .eq("date", formattedDatabaseDate);

      if (!error) {
        setIsPresent(data && data.length > 0);
      } else {
        console.error("Error fetching attendance data:", error);
      }
    };

    void fetchData();
  }, [formattedDatabaseDate, student.id, supabase]);

  const handleAttendance = async () => {
    const { data: studentData } = await supabase
      .from("students")
      .select("lessons_left")
      .eq("id", student.id);

    const currentLessonsLeft = studentData[0]?.lessons_left ?? 0;
    const newLessonsLeft = isPresent
      ? currentLessonsLeft + 1
      : currentLessonsLeft - 1;

    const attendanceAction = isPresent
      ? await supabase
          .from("attendance_record")
          .delete()
          .eq("student_id", student.id)
          .eq("date", formattedDatabaseDate)
      : await supabase
          .from("attendance_record")
          .insert([{ student_id: student.id, date: formattedDatabaseDate }]);

    const updateStudentAction = await supabase
      .from("students")
      .update({ lessons_left: newLessonsLeft })
      .eq("id", student.id);

    const attendanceResult = attendanceAction;
    const updateStudentResult = updateStudentAction;

    if (attendanceResult.error) {
      console.error(
        `Error ${isPresent ? "deleting" : "inserting"} attendance entry:`,
        attendanceResult.error,
      );
    } else {
      setIsPresent(!isPresent);
    }
  };

  const btnIcon = isPresent ? (
    <Icons.Check className="h-5 w-5 text-muted-foreground" />
  ) : (
    <Icons.Close className="h-5 w-5 text-muted-foreground" />
  );

  return (
    <Button
      onClick={handleAttendance}
      variant="outline"
      className="ml-auto px-2 py-1 md:px-4 md:py-2"
    >
      {btnIcon}
    </Button>
  );
};
