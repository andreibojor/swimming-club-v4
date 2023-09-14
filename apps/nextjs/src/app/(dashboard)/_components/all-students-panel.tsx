import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui";

export function AllStudentsPanel({ students }) {
  console.log(students);
  return (
    <div className="space-y-8">
      {students?.map((student) => (
        <div key={student.id} className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
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
  );
}
