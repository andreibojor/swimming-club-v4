import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";

import DashboardLinkClient from "./dashboard-button-client";

async function DashboardLinkServer() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <DashboardLinkClient session={session} />;
}

export default DashboardLinkServer;
