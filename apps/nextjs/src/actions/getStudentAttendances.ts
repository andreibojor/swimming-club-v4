import { cookies } from "next/headers";
import type { Attendance } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// TODO: Is this how am I gonna get attendances for a user?
const getStudentAttendances = async (): Promise<Attendance[]> => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("attendance_record")
    .select("*")
    .eq("student_id", session?.user?.id);

  if (!data) return [];

  const formattedAttendances = data.map((attendance: any) => ({
    id: attendance.id,
    date: new Date(attendance.date),
  }));

  return formattedAttendances;
};

export default getStudentAttendances;