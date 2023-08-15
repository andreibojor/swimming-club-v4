import { Suspense, type ReactNode } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { siteConfig } from "@/app/config";
import { SiteFooter } from "@/components/footer";
import { MobileDropdown } from "@/components/mobile-nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { buttonVariants } from "@acme/ui";
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
          {/* <Suspense>
            <DashboardLink />
          </Suspense> */}
        </div>
      </nav>

      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </div>
  );
}

// async function DashboardLink() {
//   const supabase = createServerComponentClient({
//     cookies: cookies,
//   });
//   const { data, error } = await supabase.auth.getSession();

//   if (!data) {
//     return (
//       <Link href="/signin" className={buttonVariants({ variant: "outline" })}>
//         Sign In
//         <Icons.ChevronRight className="ml-1 h-4 w-4" />
//       </Link>
//     );
//   }
//   return (
//     <Link
//       href={`/dashboard`}
//       className={buttonVariants({ variant: "outline" })}
//     >
//       Dashboard
//       <Icons.ChevronRight className="ml-1 h-4 w-4" />
//     </Link>
//   );
// }
