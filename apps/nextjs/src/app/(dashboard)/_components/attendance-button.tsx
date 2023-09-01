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

  const handleClick = async () => {
    try {
      if (!user?.id) {
        return;
      }

      const { data, error } = await supabaseClient
        .from("attendance_record")
        .select("*")
        .eq("student_id", studentId)
        .eq("date", formattedDatabaseDate);

      if (error) {
        console.error("Error fetching attendance data:", error);
        return;
      }

      if (data && data.length > 0) {
        // User is already present, so delete the entry
        const deleteResult = await supabaseClient
          .from("attendance_record")
          .delete()
          .eq("id", data[0].id);

        if (deleteResult.error) {
          console.error("Error deleting attendance entry:", deleteResult.error);
        } else {
          setIsPresent(false);
        }
      } else {
        // User is not present, so insert a new entry
        const insertResult = await supabaseClient
          .from("attendance_record")
          .insert([{ student_id: studentId, date: formattedDatabaseDate }]);

        if (insertResult.error) {
          console.error(
            "Error inserting attendance entry:",
            insertResult.error,
          );
        } else {
          setIsPresent(true);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const btnIcon = isPresent ? (
    <Icons.Check className="h-5 w-5 text-muted-foreground" />
  ) : (
    <Icons.Close className="h-5 w-5 text-muted-foreground" />
  );

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
