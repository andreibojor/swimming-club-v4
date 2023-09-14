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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import { AttendanceButton } from "./attendance-button";

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
          <div key={student.id} className="flex flex-col gap-1">
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {student.full_name}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Attendances Left: {student.lessons_left}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
                </div>
              </div>
              <AttendanceButton studentId={student.id} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <Icons.DotsHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                    Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Progress value={23} className="h-1 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
