import { Suspense } from "react";
import getStudents from "@/actions/getStudents";
import getStudentsByPool from "@/actions/getStudentsByPool";
import { CustomCalendar } from "@/components/day-picker";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { AllStudentsCard } from "../_components/all-students-card";
import { AttendancePanel } from "../_components/attendance-panel";
import { DashboardShell } from "../_components/dashboard-shell";
import { LoadingCard } from "../_components/loading-card";

// This page will never be cached and the data will always be up to date
export const revalidate = 0;

const pools = [
  { id: 1, name: "Cluj-Napoca", value: "cluj-napoca" },
  { id: 2, name: "Dej", value: "dej" },
  { id: 3, name: "Sancraiu", value: "sancraiu" },
];

export default async function DashboardPage({ pool = "cluj-napoca" }) {
  const students = await getStudents();
  const studentsByPool = await getStudentsByPool(pool);

  return (
    <DashboardShell
      title="Dashboard"
      description="Get an overview of how the project is going"
    >
      <Tabs defaultValue="cluj-napoca" className="space-y-4">
        <TabsList>
          {pools.map((pool) => (
            <TabsTrigger key={pool.id} value={pool.value}>
              {pool.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* TAB CONTENT */}
        {pools.map((pool) => (
          <TabsContent key={pool.id} value={pool.value} className="space-y-4">
            <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
              <Card className="w-full md:w-3/5">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomCalendar />

                  <AttendancePanel students={studentsByPool} />
                </CardContent>
              </Card>

              <AllStudentsCard students={students} />

              <Suspense
                fallback={
                  <LoadingCard
                    title="Recent Ingestions"
                    description="Loading recent ingestions..."
                    className="col-span-7 md:col-span-2 lg:col-span-3"
                  />
                }
              ></Suspense>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardShell>
  );
}
