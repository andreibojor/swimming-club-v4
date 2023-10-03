"use client";

import { Suspense, useEffect, useState } from "react";
import { CustomCalendar } from "@/components/day-picker";
import { useDate } from "@/hooks/useDate";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui";

import { AllStudentsCard } from "../_components/all-students-card";
import { AttendancePanel } from "../_components/attendance-panel";
import { LoadingCard } from "../_components/loading-card";

// This page will never be cached and the data will always be up to date
// export const revalidate = 0;

export default function DashboardTabs({
  pools,
  allStudents,
  allStudentsByPool,
  allAttendances,
}) {
  const [studentsByPool, setStudentsByPool] = useState(allStudentsByPool);
  const [selectedPool, setSelectedPool] = useState("Cluj-Napoca");

  const handleTabChange = (poolValue) => {
    setSelectedPool(poolValue);
  };

  // Filter students based on the selected pool
  const filteredStudents = studentsByPool.filter(
    (student) => student.pool === selectedPool,
  );

  return (
    <Tabs defaultValue="Cluj-Napoca" className="space-y-4">
      <TabsList>
        {pools.map((pool) => (
          <TabsTrigger
            key={pool.id}
            value={pool.value}
            onClick={() => handleTabChange(pool.value)}
          >
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
                <div className="flex flex-col justify-between md:flex-row">
                  <CustomCalendar />
                  <div className="flex w-full flex-row items-center justify-between md:flex-col">
                    <div className="flex flex-col items-center">
                      <p className="text-5xl">{filteredStudents.length}</p>
                      <h1 className="text-xl">Total Students</h1>
                      <Separator className="border-2 border-b" />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-5xl">25</p>
                      <h1 className="text-xl">Present Students</h1>
                      <Separator className="border-2 border-b" />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-5xl">42</p>
                      <h1 className="text-xl">Absent Students</h1>
                    </div>
                  </div>
                </div>
                <AttendancePanel students={filteredStudents} />
              </CardContent>
            </Card>

            <AllStudentsCard students={allStudents} />

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
  );
}
