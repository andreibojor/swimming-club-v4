import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserDetails = async (): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (user as any) || [];
};

export default getUserDetails;
