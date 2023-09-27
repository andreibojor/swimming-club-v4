"use client";

import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <Icons.DotsHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Make a copy</DropdownMenuItem>
                  <DropdownMenuItem>Favorite</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {/* <DropdownMenuRadioGroup value={pools.name}>
                  {pools.map((pool) => (
                    <DropdownMenuRadioItem key={pool.id} value={pool.value}>
                      {pool.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup> */}
                      <DropdownMenuRadioGroup value="plm">
                        <DropdownMenuRadioItem value="dej">
                          Dej
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dej">
                          cj
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dej">
                          bm
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
