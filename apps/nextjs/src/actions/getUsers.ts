import { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUsers = async (): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "student");

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getUsers;
