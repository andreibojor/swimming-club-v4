"use client";

import { useEffect } from "react";
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
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Progress,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { AttendanceButton } from "./attendance-button";

export function StudentCard({ student }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("realtime students")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "students",
  //       },
  //       () => {
  //         router.refresh();
  //       },
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [supabase, router]);

  return (
    <div className="flex flex-col gap-1">
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={`${student.avatar_url}`} />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {student.full_name}
            </p>
          </div>

          {/* <div>
            <p className="text-sm font-medium leading-none">
              Attendances Left: {student.lessons_left}
            </p>
          </div> */}
        </div>
        <AttendanceButton student={student} />
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
              <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {/* <DropdownMenuRadioGroup value={pools.name}>
                  {pools.map((pool) => (
                    <DropdownMenuRadioItem key={pool.id} value={pool.value}>
                      {pool.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup> */}
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
            {/* <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <Progress value={student.lessons_left} max={25} className="h-1 w-full" /> */}
    </div>
  );
}
