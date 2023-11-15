import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getUserDetails = async (): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const userId = user?.identities[0]?.user_id;

  // const { data, error } = await supabase
  //   .from("students")
  //   .select(
  //     `
  //   id,
  //   pool,
  //   lessons_left,
  //   professional_student,
  //   active,
  //   user:users ( full_name, avatar_url, phone, role )  // Fetching related user data
  // `,
  //   )
  //   .match({ id: userId });

  // return data[0] || [];
  return user;
};

export default getUserDetails;
