"use client";

import { useEffect, useState } from "react";
import type { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui";

import { StudentCard } from "./student-card";

export function AttendancePanel({ students }) {
  return (
    <>
      {students?.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </>
  );
}
