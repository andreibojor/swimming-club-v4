"use client";

import Link from "next/link";
import AttendancePieChart from "@/components/attendance-piechart";
import SubscribeButton from "@/components/subscribe-button";

import { Calendar, Tabs, TabsList, TabsTrigger } from "@acme/ui";

export default function StudentPanel({
  userDetails,
  sortedStudentsByParent,
  dates,
  products,
}) {
  return (
    <>
      <Tabs
        defaultValue={sortedStudentsByParent[0]?.id}
        className="space-y-4 overflow-auto"
      >
        <TabsList>
          <TabsTrigger value={userDetails?.id}>
            <Link
              className="h-full w-full"
              scroll={false}
              href={`?student=${userDetails?.id}`}
            >
              {userDetails?.full_name}
            </Link>
          </TabsTrigger>
          {sortedStudentsByParent?.map((student) => (
            <div key={student.id}>
              <TabsTrigger value={student.id}>
                <Link
                  className="h-full w-full"
                  scroll={false}
                  href={`?student=${student.id}`}
                >
                  {student.full_name}
                </Link>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>

        <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
          {/* <AttendancePieChart attendancesLeft={3} /> */}
          <SubscribeButton products={products} professionalStudent={false} />
          <Calendar mode="multiple" selected={dates} />
        </div>
      </Tabs>
    </>
  );
}
