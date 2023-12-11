"use client";

import { useEffect, useState } from "react";
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
  const [studentAttences, setStudentAttences] = useState(dates);
  const supabase = createClientComponentClient();
  const { studentId, setStudentId } = useStudentId();

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
            .select("professional_student")
            .eq("id", initialStudentId)
            .single();

          if (error) {
            console.error("Failed to fetch student:", error);
            return;
          }
          setProfessionalStudent(data?.professional_student);
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
