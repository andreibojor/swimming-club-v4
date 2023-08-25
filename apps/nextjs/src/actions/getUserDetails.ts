import { cookies } from "next/headers";
import type { UserDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getUserDetails = async (): Promise<UserDetails[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (user as any) || [];
};

export default getUserDetails;
