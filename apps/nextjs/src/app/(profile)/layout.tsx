import { Suspense } from "react";
import Link from "next/link";
import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import { SiteFooter } from "@/components/footer";
import { UserNav } from "@/components/user-nav";

import * as Icons from "@acme/ui/src/icons";

import { siteConfig } from "../config";

export default function ProfileLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <nav className="container z-50 flex h-16 items-center border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Link href="/">
            <span className="flex text-lg font-bold tracking-tight">
              <Icons.Logo className="mr-2 h-6 w-6" />
              {siteConfig.name}
            </span>
          </Link>
        </div>
        {/* <MobileDropdown /> */}
        {/* <MainNav /> */}
        <div className="ml-auto flex items-center space-x-4">
          <Suspense>
            {/* <DashboardLink /> */}
            <UserNav />
          </Suspense>
        </div>
      </nav>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
