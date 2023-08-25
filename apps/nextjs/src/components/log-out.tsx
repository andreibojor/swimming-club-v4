"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LogOut } from "lucide-react";

import { Button, DropdownMenuShortcut } from "@acme/ui";

const LogOutButton: React.FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.push("/");

    if (error) {
      //   toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={"ghost"}
      className="w-full px-2 py-1.5"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </Button>
  );
};

export default LogOutButton;
