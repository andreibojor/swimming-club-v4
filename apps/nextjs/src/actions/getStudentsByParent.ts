import type { Student } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getStudentsByParent = async (userId: string): Promise<Student[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .match({ parent_id: userId });

  error && console.log(error);

  return data || [];
};

export default getStudentsByParent;
