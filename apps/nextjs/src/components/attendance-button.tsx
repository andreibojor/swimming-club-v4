"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getPresentDate from "@/actions/getPresentDate";
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

  const date = getPresentDate();

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
      date: date,
      student_id: studentId,
      attendance: true,
    });
  };

  return (
    <Switch className="h-9 w-12" onClick={handleAttendance} checked={true} />
  );
};

export default AttendanceButton;
