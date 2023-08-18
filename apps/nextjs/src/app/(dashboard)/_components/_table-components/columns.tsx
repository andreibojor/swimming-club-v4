"use client";

import AttendanceButton from "@/components/attendance-button";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui";

import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "avatar_url",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.getValue("avatar_url")} alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("full_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {/* <AttendanceButton
            studentId={row.getValue("id")}
            checked={row.getValue("attendance")}
          /> */}
          attendance
          {/* <span>{row.getValue("attendance") ? true : false}</span> */}
        </div>
      );
    },
  },
];
