import type { AttendanceRecord } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

// TODO: Is this how am I gonna get attendances for a user?
const getStudentAttendances = async (
  studentId,
): Promise<AttendanceRecord[]> => {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("attendance_record")
    .select("*")
    .eq("student_id", studentId);

  if (!data) return [];

  const formattedAttendances = data.map((attendance: any) => ({
    id: attendance.id,
    date: new Date(attendance.date),
  }));

  return formattedAttendances;
};

export default getStudentAttendances;
