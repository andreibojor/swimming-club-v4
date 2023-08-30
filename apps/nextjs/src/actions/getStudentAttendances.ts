// import type { Song } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

// TODO: Is this how am I gonna get attendances for a user?
const getStudentAttendances = async (): Promise<Song[]> => {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase.from("attendance_record").select("*");

  if (!data) return [];

  return (data as any) || [];
};

export default getStudentAttendances;
