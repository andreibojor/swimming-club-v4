import type { Attendance } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getAllAttendancesByPoolAndDate = async (
  pool: string,
  date: string,
): Promise<Attendance[]> => {
  const supabase = createServerSupabaseClient();

  // Fetching all attendance records for the specified date
  const { data: attendanceData } = await supabase
    .from("attendance_record")
    .select("student_id")
    .eq("date", date);

  if (!attendanceData) {
    throw new Error("Error fetching attendance data");
  }

  // Fetching all student ids from the specified pool
  const { data: studentData } = await supabase
    .from("students")
    .select("id")
    .eq("pool", pool);

  if (!studentData) {
    throw new Error("Error fetching student data");
  }

  // Filtering the attendance data to keep only the records where the student_id is in the list of student ids from the specified pool
  const presentStudents = attendanceData.filter((attendance) =>
    studentData.some((student) => student.id === attendance.student_id),
  );

  return presentStudents;
};

export default getAllAttendancesByPoolAndDate;
