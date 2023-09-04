"use client";

import { useEffect, useState } from "react";
import { useDate } from "@/hooks/useDate";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Button } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

interface AttendanceButtonProps {
  studentId: string;
}

export const AttendanceButton: React.FC<AttendanceButtonProps> = ({
  studentId,
}) => {
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const { date } = useDate();

  const formattedDatabaseDate = `${date.getFullYear()} ${String(
    date.getMonth() + 1,
  ).padStart(2, "0")} ${String(date.getDate()).padStart(2, "0")}`;

  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabaseClient
          .from("attendance_record")
          .select("*")
          .eq("student_id", studentId)
          .eq("date", formattedDatabaseDate);

        if (!error) {
          setIsPresent(data && data.length > 0);
        } else {
          console.error("Error fetching attendance data:", error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    void fetchData();
  }, [formattedDatabaseDate, studentId, supabaseClient, user?.id]);

  const handleAttendance = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabaseClient
        .from("attendance_record")
        .select("*")
        .eq("student_id", studentId)
        .eq("date", formattedDatabaseDate);

      const { data: studentData, error: studentError } = await supabaseClient
        .from("students")
        .select("lessons_left")
        .eq("id", studentId);

      if (error) {
        console.error("Error fetching attendance data:", error);
        return;
      }

      const currentLessonsLeft = studentData[0]?.lessons_left || 0;
      const newLessonsLeft = isPresent
        ? currentLessonsLeft + 1
        : currentLessonsLeft - 1;

      const attendanceAction = isPresent
        ? supabaseClient
            .from("attendance_record")
            .delete()
            .eq("student_id", studentId)
            .eq("date", formattedDatabaseDate)
        : supabaseClient
            .from("attendance_record")
            .insert([{ student_id: studentId, date: formattedDatabaseDate }]);

      const updateStudentResult = await supabaseClient
        .from("students")
        .update({ lessons_left: newLessonsLeft })
        .eq("id", studentId);

      const attendanceResult = await attendanceAction;

      if (attendanceResult.error) {
        console.error(
          `Error ${isPresent ? "deleting" : "inserting"} attendance entry:`,
          attendanceResult.error,
        );
      } else {
        setIsPresent(!isPresent);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
