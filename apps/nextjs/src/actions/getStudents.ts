import type { Student } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getStudents = async (): Promise<Student[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("students").select(`
    id,
    pool,
    lessons_left,
    professional_student,
    active,
    user:users ( full_name, avatar_url, role )  // Fetching related user data
  `);

  if (error) {
    console.log(error);
  }

  // Map the data to match the desired structure
  const mappedData =
    data?.map((student) => ({
      id: student.id,
      full_name: student.user.full_name,
      avatar_url: student.user.avatar_url,
      role: student.user.role,
      pool: student.pool,
      lessons_left: student.lessons_left,
      professional_student: student.professional_student,
      active: student.active,
    })) ?? [];

  // Order the mapped data by full_name
  const orderedData = mappedData.sort((a, b) =>
    a.full_name.localeCompare(b.full_name),
  );

  return orderedData;
};

export default getStudents;
