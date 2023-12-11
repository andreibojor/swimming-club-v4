import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserDetails = async (userId: string): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return userData;
};

export default getUserDetails;
