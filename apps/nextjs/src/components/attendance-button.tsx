"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Switch } from "@acme/ui";

interface LikeButtonProps {
  studentId: string;
  checked: boolean;
}

const AttendanceButton: React.FC<LikeButtonProps> = ({
  studentId,
  checked,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const [isPresent, setIsPresent] = useState<boolean>(checked);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("attendance_record")
        .select("*")
        .eq("student_id", studentId)
        .single();

      if (!error && data) {
        setIsPresent(true);
      }
      console.log("fetchData():", data);
    };

    void fetchData();
    // }, [studentId, supabaseClient, user?.id]);
  }, [studentId, supabaseClient]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const handleAttendance = async () => {
    console.log("studentId:", studentId);
    console.log("attendance: ", checked);

    if (isPresent) {
      const { error } = await supabaseClient
        .from("attendance_record")
        .delete()
        .eq("student_id", studentId);

      if (error) {
        // toast.error(error.message);
        console.log(error.message);
      } else {
        setIsPresent(false);
      }
    } else {
      const { error } = await supabaseClient.from("attendance_record").insert({
        date: formattedDate,
        student_id: studentId,
        attendance: true,
      });

      if (error) {
        // toast.error(error.message);
        console.log(error.message);
      } else {
        setIsPresent(true);
        // toast.success("Success");
      }
    }

    router.refresh();
  };

  return (
    <Switch className="h-9 w-12" onClick={handleAttendance} checked={checked} />
  );
};

export default AttendanceButton;
