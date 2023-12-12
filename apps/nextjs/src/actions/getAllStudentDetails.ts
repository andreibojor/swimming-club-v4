import type { UserDetails } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getAllStudentDetails = async (
  studentId: string,
): Promise<UserDetails[]> => {
  const supabase = createServerSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", studentId)
    .single();

  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select(
      "id, full_name, pool, swimmer_level, lessons_left, medical_certificate_path, student_phone, parent_id",
    )
    .eq("id", studentId)
    .single();

  const parentId = studentData?.parent_id;
  let parentName = null;
  if (parentId) {
    const { data: parentData, error: parentError } = await supabase
      .from("users")
      .select("full_name") // Adjust field name as necessary
      .eq("id", parentId)
      .single();

    if (parentError) {
      console.log("Error fetching parent data:", parentError);
    } else {
      parentName = parentData?.full_name;
    }
  }

  const { data: studentSubscriptionData, error: studentSubscriptionError } =
    await supabase
      .from("subscriptions")
      .select("current_period_start, current_period_end, status")
      .eq("user_id", studentId)
      .single();

  error && console.log(error);
  const allData = {
    ...userData,
    ...studentData,
    parent_name: parentName,
    ...studentSubscriptionData,
  };

  return allData;
};

export default getAllStudentDetails;
