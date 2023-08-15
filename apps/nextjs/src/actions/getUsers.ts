import { createServerComponentClient } from "@/actions/createServerComponentClient";

interface UserInterface {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

const getUsers = async (): Promise<UserInterface[]> => {
  const supabase = createServerComponentClient();

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
