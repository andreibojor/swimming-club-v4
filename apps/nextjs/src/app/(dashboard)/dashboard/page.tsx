import getAllAttendances from "@/actions/getAllAttendances";
import getAllAttendancesByPoolAndDate from "@/actions/getAllAttendancesByPoolAndDate";
import getStudentAttendances from "@/actions/getStudentAttendances";
import getStudents from "@/actions/getStudents";
import getStudentsByPool from "@/actions/getStudentsByPool";
import { marketingFeatures } from "@/app/config";
import { useDate } from "@/hooks/useDate";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@acme/ui";

import { DashboardShell } from "../_components/dashboard-shell";
import DashboardTabs from "../_components/dashboard-tabs";

// This page will never be cached and the data will always be up to date
// export const revalidate = 0;
const pools = [
  { id: 1, name: "Cluj-Napoca", value: "Cluj-Napoca" },
  { id: 2, name: "Dej", value: "Dej" },
  { id: 3, name: "Sancraiu", value: "Sancraiu" },
];

export default async function DashboardPage() {
  const students = await getStudents();
  const allStudentsByPool = await getStudentsByPool();
  // TODO: use .reduce to get the right number of students?
  const studentsAttendances = await getAllAttendances();
  console.log("  console.log(`allStudentsByPool ${allStudentsByPool}`);");
  console.log(allStudentsByPool);

  console.log("  const { studentsAttendances } = await getAllAttendances();");
  console.log(studentsAttendances);
  return (
    <DashboardShell
      title="Dashboard"
      description="Get an overview of how the project is going"
    >
      <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
        <div className="flex flex-col justify-between gap-5">
          <DashboardTabs
            pools={pools}
            allStudents={students}
            allStudentsByPool={allStudentsByPool}
            studentsAttendances={studentsAttendances}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {marketingFeatures.map((feature) => (
              <Card key={feature.title} className={cn("p-2")}>
                <CardHeader>{feature.icon}</CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {feature.body}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
