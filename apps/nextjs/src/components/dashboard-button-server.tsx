import Link from "next/link";

import { buttonVariants } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

function DashboardLink() {
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
