"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Switch } from "@acme/ui";

export default function AttendanceButton(props: { attendanceId: string }) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("attendance_record")
        .select("*")
        .eq("student_id", user.id);

      if (!error && data) setIsPresent(true);
    };

    void fetchData();
  }, [supabaseClient, user?.id]);

  return (
    <Switch
      id="airplane-mode"
      className="h-9 w-12"
      onClick={() => console.log("yo")}
    />
  );
}
