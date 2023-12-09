import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getAllStudentDetails = async (
  studentId: string,
): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("students")
    .select("*, users(phone, role)")
    .eq("id", studentId)
    .single();

  error && console.log(error);

  return data || [];
};

export default getAllStudentDetails;
