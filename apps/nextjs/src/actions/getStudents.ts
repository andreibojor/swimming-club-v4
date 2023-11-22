import type { Student } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getStudents = async (): Promise<Student[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("students").select("*");
  error && console.log(error);

  return data || [];
};

export default getStudents;
