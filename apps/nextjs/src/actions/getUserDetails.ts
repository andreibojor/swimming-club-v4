import { cookies } from "next/headers";
import type { UserDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getUserDetails = async (): Promise<UserDetails[]> => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.identities[0]?.user_id;

  const { data, error } = await supabase
    .from("students")
    .select(
      `
    id,
    pool,
    lessons_left,
    professional_student,
    active,
    user:users ( full_name, avatar_url, phone, role )  // Fetching related user data
  `,
    )
    .match({ id: userId });

  return data[0];
};

export default getUserDetails;
