import { cache } from "react";
import { cookies } from "next/headers";
import type { Database } from "@/types_db";
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient<Database>({ cookies: () => cookieStore });
});
