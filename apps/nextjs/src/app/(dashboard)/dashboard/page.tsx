import getStudents from "@/actions/getStudents";
import getStudentsByPool from "@/actions/getStudentsByPool";

import { DashboardShell } from "../_components/dashboard-shell";
import DashboardTabs from "../_components/dashboard-tabs";

// This page will never be cached and the data will always be up to date
export const revalidate = 0;

const pools = [
  { id: 1, name: "Cluj-Napoca", value: "cluj-napoca" },
  { id: 2, name: "Dej", value: "dej" },
  { id: 3, name: "Sancraiu", value: "sancraiu" },
];

export default async function DashboardPage() {
  const students = await getStudents();
  const allStudentsByPool = await getStudentsByPool();

  return (
    <DashboardShell
      title="Dashboard"
      description="Get an overview of how the project is going"
    >
      <DashboardTabs
        pools={pools}
        allStudents={students}
        allStudentsByPool={allStudentsByPool}
      />
    </DashboardShell>
  );
}
