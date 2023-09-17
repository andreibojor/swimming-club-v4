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
    <Card>
      <CardHeader className="px-2 pb-2 md:px-6 md:pb-6">
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 md:p-6">
        {students?.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </CardContent>
    </Card>
  );
}
