import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserRole = async (userId): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select("role") // Selecting only the role
    .eq("id", userId)
    .single(); // Expecting a single row

  if (error) {
    console.error(error); // Log the error to see if there's any issue
    throw error;
  }

  return data || null;
};

export default getUserRole;
