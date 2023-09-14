import { Suspense } from "react";
import getStudents from "@/actions/getStudents";
import getStudentsByPool from "@/actions/getStudentsByPool";
import getUsers from "@/actions/getUsers";
import { CustomCalendar } from "@/components/day-picker";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { AllStudentsPanel } from "../_components/all-students-panel";
import { AttendancePanel } from "../_components/attendance-panel";
import { DashboardShell } from "../_components/dashboard-shell";
import { LoadingCard } from "../_components/loading-card";

// This page will never be cached and the data will always be up to date
export const revalidate = 0;

export default async function DashboardPage({ pool = "cluj-napoca" }) {
  const users = await getUsers();
  const students = await getStudents();
  const studentsByPool = await getStudentsByPool(pool);

  return (
    <DashboardShell
      title="Dashboard"
      description="Get an overview of how the project is going"
    >
      <Tabs defaultValue="cluj-napoca" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cluj-napoca">Cluj-Napoca</TabsTrigger>
          <TabsTrigger value="dej">Dej</TabsTrigger>
          <TabsTrigger value="sancraiu">Sâncraiu</TabsTrigger>
        </TabsList>

        {/* TAB CONTENT - Cluj-Napoca */}
        <TabsContent value="cluj-napoca" className="space-y-4">
          <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
            <Card className="w-full md:w-3/5">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <CustomCalendar />
                <AttendancePanel students={studentsByPool} />
              </CardContent>
            </Card>
            <Card className="w-full md:w-2/5">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                  <Input
                    placeholder="Filter students..."
                    // value={
                    //   (table
                    //     .getColumn("full_name")
                    //     ?.getFilterValue() as string) ?? ""
                    // }
                    // onChange={(event) =>
                    //   table
                    //     .getColumn("full_name")
                    //     ?.setFilterValue(event.target.value)
                    // }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                </CardDescription>
              </CardHeader>

              <CardContent>
                <AllStudentsPanel students={students} />
              </CardContent>
            </Card>

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

        {/* TAB CONTENT - DATA TABLE - Dej */}
        <TabsContent value="dej" className="space-y-4">
          <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
            <Card className="w-full md:w-3/5">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <CustomCalendar />
                <AttendancePanel students={studentsByPool} />
              </CardContent>
            </Card>
            <Card className="w-full md:w-2/5">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                  <Input
                    placeholder="Filter students..."
                    // value={
                    //   (table
                    //     .getColumn("full_name")
                    //     ?.getFilterValue() as string) ?? ""
                    // }
                    // onChange={(event) =>
                    //   table
                    //     .getColumn("full_name")
                    //     ?.setFilterValue(event.target.value)
                    // }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                </CardDescription>
              </CardHeader>

              <CardContent>
                <AllStudentsPanel students={students} />
              </CardContent>
            </Card>

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

        {/* TAB CONTENT - DATA TABLE - Sancraiu */}
        <TabsContent value="sancraiu" className="space-y-4">
          <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
            <Card className="w-full md:w-3/5">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <CustomCalendar />
                <AttendancePanel students={studentsByPool} />
              </CardContent>
            </Card>
            <Card className="w-full md:w-2/5">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                  <Input
                    placeholder="Filter students..."
                    // value={
                    //   (table
                    //     .getColumn("full_name")
                    //     ?.getFilterValue() as string) ?? ""
                    // }
                    // onChange={(event) =>
                    //   table
                    //     .getColumn("full_name")
                    //     ?.setFilterValue(event.target.value)
                    // }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                </CardDescription>
              </CardHeader>

              <CardContent>
                <AllStudentsPanel students={students} />
              </CardContent>
            </Card>

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
      </Tabs>
    </DashboardShell>
  );
}
