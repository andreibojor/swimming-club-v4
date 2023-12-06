"use client";

import { useState } from "react";
import Link from "next/link";
import AttendancePieChart from "@/components/attendance-piechart";
import SubscribeButton from "@/components/subscribe-button";
import { useStudentId } from "@/hooks/useStudentId";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Calendar, Tabs, TabsList, TabsTrigger } from "@acme/ui";

export default function StudentPanel({
  userDetails,
  sortedStudentsByParent,
  dates,
  products,
}) {
  const [professionalStudent, setProfessionalStudent] = useState(false);
  const { studentId, setStudentId } = useStudentId();

  const supabase = createClientComponentClient();

  const handleTabClick = async (studentId: string) => {
    // Update the Zustand state
    setStudentId(studentId);

    // Fetch the student's details from Supabase
    const { data, error } = await supabase
      .from("students") // replace 'students' with your actual table name
      .select("professional_student")
      .eq("id", studentId)
      .single();

    if (error) {
      console.error("Failed to fetch student:", error);
      return;
    }
    setProfessionalStudent(data?.professional_student);
  };

  return (
    <>
      <Tabs
        // defaultValue={sortedStudentsByParent[0]?.id} s
        defaultValue={userDetails?.id}
        className="space-y-4 overflow-auto"
      >
        <TabsList>
          {/* <Link
            className="h-full w-full"
            scroll={false}
            href={`?stundent=${userDetails?.id}`}
          >
            <TabsTrigger
              value={userDetails?.id}
              onClick={() => setStudentId(userDetails?.id)}
            >
              {userDetails?.full_name}
            </TabsTrigger>
          </Link> */}
          {sortedStudentsByParent?.map((student) => (
            <Link
              className="h-full w-full"
              scroll={false}
              href={`?stundent=${student.id}`}
              key={student.id}
            >
              <div>
                <TabsTrigger
                  value={student.id}
                  onClick={() => handleTabClick(student.id)}
                >
                  {student.full_name}
                </TabsTrigger>
              </div>
            </Link>
          ))}
        </TabsList>

        <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
          {/* <AttendancePieChart attendancesLeft={3} /> */}
          <SubscribeButton
            products={products}
            professionalStudent={professionalStudent}
          />
          <Calendar mode="multiple" selected={dates} />
        </div>
      </Tabs>
    </>
  );
}
