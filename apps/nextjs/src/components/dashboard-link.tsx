"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

import { buttonVariants } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

function DashboardLink() {
  const { user } = useUser();

  if (!user) {
    return (
      <Link href="/signin" className={buttonVariants({ variant: "outline" })}>
        Sign In
        <Icons.ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href={`/dashboard`}
      className={buttonVariants({ variant: "outline" })}
    >
      Dashboard
      <Icons.ChevronRight className="ml-1 h-4 w-4" />
    </Link>
  );
}

export default DashboardLink;
