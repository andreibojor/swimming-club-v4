"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SessionContext } from "@supabase/auth-helpers-react";
import type { Session } from "@supabase/supabase-js";

import { buttonVariants } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

function DashboardLinkClient({ session }: { session: Session | null }) {
  const { user } = useUser();
  const supabase = createClientComponentClient();
  const router = useRouter();
  if (!session) {
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

export default DashboardLinkClient;
