"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SubscribeButton from "@/app/(profile)/[studentId]/_components/subscribe-button";
import AttendancePieChart from "@/components/attendance-piechart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Calendar, Tabs, TabsList, TabsTrigger } from "@acme/ui";

export default function StudentPanel({
  sortedStudentsByParent,
  dates,
  products,
  studentIdSearchParams,
  studentIdParams,
  allStudentDetails,
}) {
  const [swimmerLevel, setSwimmerLevel] = useState("");
  const [studentAttences, setStudentAttences] = useState(dates);
  const supabase = createClientComponentClient();

  const getStudentAttendances = async (studentId: string) => {
    const { data } = await supabase
      .from("attendance_record")
      .select("*")
      .eq("student_id", studentId);
    if (!data) return [];
    const formattedAttendances = data.map((attendance: any) => ({
      id: attendance.id,
      date: new Date(attendance.date),
    }));
    const dates = formattedAttendances.map((attendance) => attendance.date);
    setStudentAttences(dates);
  };
  useEffect(() => {
    async function fetchInitialStudentData() {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("swimmer_level")
          .eq("id", studentIdSearchParams)
          .single();

        if (error) {
          console.error("Failed to fetch student:", error);
          return;
        }
        setSwimmerLevel(data?.swimmer_level);
      } catch (error) {
        console.error("Error fetching initial student data:", error);
      }
    }

    fetchInitialStudentData();
  }, [studentIdSearchParams]);

  const handleTabClick = async (studentId: string) => {
    // Fetch the student's details from Supabase
    const { data, error } = await supabase
      .from("students")
      .select("swimmer_level")
      .eq("id", studentId)
      .single();
    if (error) {
      console.error("Failed to fetch student:", error);
      return;
    }
    setSwimmerLevel(data?.swimmer_level);
    getStudentAttendances(studentId);
  };

  return (
    <>
      <Tabs defaultValue={studentIdSearchParams} className="space-y-4">
        <TabsList className="flex justify-normal overflow-x-auto md:inline-flex md:justify-center">
          {sortedStudentsByParent?.map((student) => (
            <Link
              className="h-full w-full"
              scroll={false}
              href={`?student=${student.id}`}
              key={student.id}
            >
              <TabsTrigger
                key={student.id}
                value={student.id}
                onClick={() => handleTabClick(student.id)}
              >
                {student.full_name}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
        <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
          {swimmerLevel === "beginner" ? (
            <AttendancePieChart attendancesLeft={3} />
          ) : (
            ""
          )}
          <SubscribeButton
            products={products}
            swimmerLevel={swimmerLevel}
            studentIdStripe={studentIdSearchParams}
          />
          <Calendar mode="multiple" selected={studentAttences} />
        </div>
      </Tabs>
    </>
  );
}
