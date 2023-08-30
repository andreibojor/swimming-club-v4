"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDate } from "@/hooks/useDate";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Button } from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

interface AttendanceButtonProps {
  studentId: string;
}

export const AttendanceButton: React.FC<AttendanceButtonProps> = ({
  studentId,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { user } = useUser();
  const { date } = useDate();
  const formattedDatabaseDate = (() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} ${month} ${day}`;
  })();

  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("attendance_record")
          .select("*")
          .eq("student_id", studentId)
          .eq("date", formattedDatabaseDate);

        if (!error) {
          if (data && data.length > 0) {
            setIsPresent(true); // User exists in attendance_record for the specified date
          } else {
            setIsPresent(false); // User doesn't exist in attendance_record for the specified date
          }
        } else {
          console.error("Error fetching attendance data:", error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    void fetchData();
  }, [formattedDatabaseDate, studentId, supabaseClient, user?.id]);

  const btnIcon = isPresent ? (
    <Icons.Check className="ml-2 h-4 w-4 text-muted-foreground" />
  ) : (
    <Icons.Close className="ml-2 h-4 w-4 text-muted-foreground" />
  );

  const handleClick = () => {
    console.log(studentId);
    console.log(date);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="ml-auto px-2 py-1 md:px-4 md:py-2"
    >
      {btnIcon}
    </Button>
  );
};
