import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserInterface {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

const getUserRegistration = async ({ userId }): Promise<UserInterface[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("users")
    .select("completed_registration")
    .eq("id", userId);

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getUserRegistration;
