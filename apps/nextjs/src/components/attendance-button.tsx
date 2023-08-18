"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";

// import { toast } from "react-hot-toast";
import { Switch } from "@acme/ui";

interface LikeButtonProps {
  studentId: string;
  checked: boolean;
}

const AttendanceButton: React.FC<LikeButtonProps> = ({ studentId }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("realtime attendance")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "attendance_record",
  //       },
  //       () => {
  //         router.refresh();
  //       },
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [supabase, router]);

  const handleAttendance = async () => {
    const { error } = await supabase.from("attendance_record").insert({
      date: formattedDate,
      student_id: studentId,
      attendance: true,
    });
  };

  return (
    <Switch className="h-9 w-12" onClick={handleAttendance} checked={true} />
  );
};

export default AttendanceButton;
