"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Switch } from "@acme/ui";

interface LikeButtonProps {
  studentId: string;
}

const AttendanceButton: React.FC<LikeButtonProps> = ({ studentId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  // const authModal = useAuthModal();
  const { user } = useUser();

  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("attendance_record")
        .select("*")
        .eq("id", user.id)
        .eq("student_id", studentId)
        .single();

      if (!error && data) {
        setIsPresent(true);
      }
    };

    void fetchData();
  }, [studentId, supabaseClient, user?.id]);

  // Date Format DD/MM/YYYY
  const date = new Date().toLocaleDateString("en-GB");

  const handleAttendance = async () => {
    console.log("studentId:", studentId);
    if (!user) {
      // return authModal.onOpen();
      console.log("login please");
    }

    if (isPresent) {
      const { error } = await supabaseClient
        .from("attendance_record")
        .delete()
        .eq("id", user.id)
        .eq("student_id", studentId);

      if (error) {
        // toast.error(error.message);
        console.log(error.message);
      } else {
        setIsPresent(false);
      }
    } else {
      const { error } = await supabaseClient.from("attendance_record").insert({
        // id: user.id,
        date: date,
        // student_id: studentId,
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
    <Switch
      id="airplane-mode"
      className="h-9 w-12"
      onClick={handleAttendance}
    />
  );
};

export default AttendanceButton;
