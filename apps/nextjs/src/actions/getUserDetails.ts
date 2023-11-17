import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserDetails = async (userId: string): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ id: userId });

  error && console.log(error);

  return data[0] || [];
};

export default getUserDetails;
