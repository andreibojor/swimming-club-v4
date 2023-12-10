import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import getStudents from "@/actions/getStudents";

import DashboardTabs from "../_components/dashboard-tabs";

// This page will never be cached and the data will always be up to date
// export const revalidate = 0;
const pools = [
  { id: 1, name: "Cluj-Napoca", value: "Cluj-Napoca" },
  { id: 2, name: "Dej", value: "Dej" },
  { id: 3, name: "Sancraiu", value: "Sancraiu" },
];

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const students = await getStudents();

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <div className="flex flex-col justify-between gap-5">
        <DashboardTabs pools={pools} students={students} />
      </div>
    </div>
  );
}
