import Link from "next/link";
import { SiteFooter } from "@/components/footer";
import { UserNav } from "@/components/user-nav";

import * as Icons from "@acme/ui/src/icons";

export default function ProfileLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden rounded-[0.5rem] bg-background">
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 md:px-8">
          <Link href="/">
            <Icons.Logo />
          </Link>
          <span className="mx-2 text-lg font-bold text-muted-foreground">
            /
          </span>
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav />
          </div>
        </div>
      </nav>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
