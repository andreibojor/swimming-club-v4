import { createServerSupabaseClient } from "./createServerSupabaseClient";

interface UserInterface {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

const getUserRole = async (userId): Promise<UserInterface[]> => {
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
