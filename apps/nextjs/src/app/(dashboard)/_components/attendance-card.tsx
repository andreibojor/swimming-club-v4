"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Separator,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { AttendanceButton } from "./attendance-button";
import SwimmerCard from "./swimmer-card";

export function AttendanceCard({ student }) {
  const [lessonsLeft, setLessonsLeft] = useState(student.lessons_left);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return initials;
  };

  useEffect(() => {
    const channel = supabase
      .channel(`student-updates`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "students",
          filter: `id=eq.${student.id}`,
        },
        (payload) => {
          if (payload.new.lessons_left) {
            setLessonsLeft(payload.new.lessons_left);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, student.id]);

  return (
    <div className="flex flex-col gap-1">
      <div className="mt-2 flex items-center justify-between gap-2">
        <SwimmerCard student={student}>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`${student?.avatar_url}`} />
              <AvatarFallback>{getInitials(student?.full_name)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium leading-none">
                {student.full_name}
              </p>
            </div>
            {student.swimmer_level === "beginner" && (
              <>
                <p className="text-sm font-medium leading-none">
                  Attendances Left:
                </p>
                <p className="text-sm font-medium">{lessonsLeft}</p>
              </>
            )}
          </div>
        </SwimmerCard>
        <AttendanceButton student={student} />

        {/* <DropdownMenu>
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
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={pools.name}>
                  {pools.map((pool) => (
                    <DropdownMenuRadioItem key={pool.id} value={pool.value}>
                      {pool.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuRadioGroup value={`${student.pool}`}>
                  <DropdownMenuRadioItem value="Cluj-Napoca">
                    Cluj-Napoca
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Dej">Dej</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Sancraiu">
                    Sancraiu
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      {/* <Progress value={student.lessons_left} max={25} className="h-1 w-full" /> */}
      <Separator className="my-2" />
    </div>
  );
}
