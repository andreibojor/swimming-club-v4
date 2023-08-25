import { Suspense, type ReactNode } from "react";
import { siteConfig } from "@/app/config";
import DashboardLink from "@/components/dashboard-link";
import { SiteFooter } from "@/components/footer";
import { MobileDropdown } from "@/components/mobile-nav";

import * as Icons from "@acme/ui/src/icons";

import { MainNav } from "../(dashboard)/_components/main-nav";

export default function MarketingLayout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="container z-50 flex h-16 items-center border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </div>
        <MobileDropdown />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Suspense>
            <DashboardLink />
          </Suspense>
        </div>
      </nav>

      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </div>
  );
}
