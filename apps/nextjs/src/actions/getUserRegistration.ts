import { createServerSupabaseClient } from "./createServerSupabaseClient";

interface UserInterface {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

const getUserRegistration = async ({ userId }): Promise<UserInterface[]> => {
  const supabase = createServerSupabaseClient();

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
