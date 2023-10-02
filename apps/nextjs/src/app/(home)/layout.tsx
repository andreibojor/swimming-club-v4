import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import getUserDetails from "@/actions/getUserDetails";
import { siteConfig } from "@/app/config";
import DashboardLinkServer from "@/components/dashboard-button-server";
import { SiteFooter } from "@/components/footer";
import { MobileDropdown } from "@/components/mobile-nav";
import { UserNav } from "@/components/user-nav";

import { buttonVariants } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { MainNav } from "../(dashboard)/_components/main-nav";

export default async function HomeLayout(props: { children: ReactNode }) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let userDetails, userRole;

  // Only call getUserDetails if session exists
  if (session) {
    userDetails = await getUserDetails(session.user.id);
    userRole = userDetails?.user.role;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="container z-50 flex h-16 items-center border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Link href="/">
            <span className="flex text-lg font-bold tracking-tight">
              <Icons.Logo className="mr-2 h-6 w-6" />
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <MobileDropdown />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Suspense>
            {session ? (
              userRole && userRole === "admin" ? (
                <DashboardLinkServer />
              ) : (
                <UserNav />
              )
            ) : (
              <Link
                href="/signin"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign In
                <Icons.ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            )}
          </Suspense>
        </div>
      </nav>

      <main className="flex min-h-screen w-full flex-1 flex-col items-center justify-center pt-48">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
