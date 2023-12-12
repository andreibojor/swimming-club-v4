"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AttendancePieChart from "@/components/attendance-piechart";
import SubscribeButton from "@/components/subscribe-button";
import { useStudentIdStripe } from "@/hooks/useStudentIdStripe";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Calendar, Tabs, TabsList, TabsTrigger } from "@acme/ui";

export default function StudentPanel({
  userDetails,
  sortedStudentsByParent,
  dates,
  products,
  allStudentDetails,
}) {
  const [professionalStudent, setProfessionalStudent] = useState("");
  const [studentAttences, setStudentAttences] = useState(dates);
  const supabase = createClientComponentClient();
  const { studentIdStripe, setStudentIdStripe } = useStudentIdStripe();

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
        const initialStudentId = userDetails?.id; // or another default value
        if (initialStudentId) {
          const { data, error } = await supabase
            .from("students") // replace 'students' with your actual table name
            .select("swimmer_level")
            .eq("id", initialStudentId)
            .single();

          if (error) {
            console.error("Failed to fetch student:", error);
            return;
          }
          setProfessionalStudent(data?.swimmer_level);
        }
      } catch (error) {
        console.error("Error fetching initial student data:", error);
      } finally {
        console.log("Done fetching initial student data");
      }
    }

    fetchInitialStudentData();
  }, [userDetails?.id]); // Dependency array to run this effect when userDetails.id changes

  const handleTabClick = async (studentId: string) => {
    // Update the Zustand state
    setStudentIdStripe(studentId);

    // Fetch the student's details from Supabase
    const { data, error } = await supabase
      .from("students") // replace 'students' with your actual table name
      .select("swimmer_level")
      .eq("id", studentId)
      .single();

    if (error) {
      console.error("Failed to fetch student:", error);
      return;
    }
    setProfessionalStudent(data?.swimmer_level);
    getStudentAttendances(studentId);
  };

  return (
    <>
      <Tabs defaultValue={userDetails.id} className="space-y-4">
        <TabsList className="flex justify-normal overflow-x-auto md:inline-flex md:justify-center">
          <Link
            className="h-full w-full"
            scroll={false}
            href={`?stundent=${userDetails?.id}`}
          >
            <TabsTrigger value={userDetails?.id}>
              {userDetails?.full_name}
            </TabsTrigger>
          </Link>
          {sortedStudentsByParent?.map((student) => (
            // <Link
            //   className="h-full w-full"
            //   scroll={false}
            //   href={`?student=${student.id}`}
            //   key={student.id}
            // >
            <TabsTrigger
              key={student.id}
              value={student.id}
              onClick={() => handleTabClick(student.id)}
            >
              {student.full_name}
            </TabsTrigger>
            // </Link>
          ))}
        </TabsList>

        <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
          {/* <AttendancePieChart attendancesLeft={3} /> */}
          <SubscribeButton
            products={products}
            professionalStudent={professionalStudent}
          />
          <Calendar mode="multiple" selected={studentAttences} />
        </div>
      </Tabs>
    </>
  );
}
