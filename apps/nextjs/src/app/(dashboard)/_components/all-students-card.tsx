"use client";

import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@acme/ui";

export function AllStudentsCard({ students }) {
  const [filteredStudents, setFilteredStudents] = useState("");

  const displayedStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(filteredStudents.toLowerCase()),
  );

  return (
    <Card className="w-full md:w-2/5">
      <CardHeader>
        <CardTitle>All Students</CardTitle>
        <CardDescription>
          <Input
            placeholder="Filter students..."
            value={filteredStudents}
            onChange={(event) => setFilteredStudents(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {displayedStudents?.map((student) => (
            <div key={student.id} className="flex items-center">
              <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                <AvatarImage src={`${student.avatar_url}`} alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {student.full_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
