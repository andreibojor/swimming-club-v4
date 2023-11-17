// import { Suspense } from "react";

import { Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/footer";
import { MobileDropdown } from "@/components/mobile-nav";
import { UserNav } from "@/components/user-nav";

import * as Icons from "@acme/ui/src/icons";

import { siteConfig } from "../config";

// import { api } from "~/trpc/server";
// import { ProjectSwitcher } from "./_components/project-switcher";
// import { Search } from "./_components/search";
// import { WorkspaceSwitcher } from "./_components/workspace-switcher";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden rounded-[0.5rem] bg-background">
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
