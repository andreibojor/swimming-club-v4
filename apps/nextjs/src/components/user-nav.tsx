import Link from "next/link";
// import { redirect, useRouter } from "next/navigation";
// import { useUser } from "@/hooks/useUser";

// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@acme/ui";

import DashboardLink from "./dashboard-link";
import LogOutButton from "./log-out";

export function UserNav() {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const { data } = await supabase.auth.getUser();
  // const { avatar_url: avatarUrl } = data.user?.user_metadata ?? {};

  // const supabaseClient = useSupabaseClient();
  // const { user } = useUser();

  // const handleLogout = async () => {
  //   const { error } = await supabaseClient.auth.signOut();
  //   router.refresh();

  //   if (error) {
  //     console.log(error);
  //     // toast.error(error.message);
  //   }
  // };

  // if (!session) {
  //   return (
  //     <Link href="/signin">
  //       <Button variant="ghost" className="relative h-8 w-8 rounded">
  //         <Avatar className="h-8 w-8">
  //           <AvatarFallback className="bg-transparent">
  //             <LogIn className="h-6 w-6" />
  //           </AvatarFallback>
  //         </Avatar>
  //       </Button>
  //     </Link>
  //   );
  // }

  // const fullname = `${user.firstName} ${user.lastName}`;
  // const initials = fullname
  //   .split(" ")
  //   .map((n) => n[0])
  //   .join("");
  // const email = user.emailAddresses.find(
  //   (e) => e.id === user.primaryEmailAddressId,
  // )?.emailAddress;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src={avatarUrl} alt="Avatar Image" /> */}
            <AvatarFallback>A F</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {/* {user.firstName} {user.lastName} */}a
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* {email} */}a
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* <Link href={`/${user.id}/settings`}> */}
            <Link href={`/profile`}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {/* <Link href={`/${user.id}/billing`}> */}
            <Link href={`/dashboard`}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
