import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserDetails = async (userId: string): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", userId)
    .single();

  error && console.log(error);
  const allData = {
    ...userData,
    ...studentData,
  };

  console.log(allData);
  return allData;
};

export default getUserDetails;
