import getUsers from "@/actions/getUsers";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

export async function DemoTeamMembers() {
  const users = await getUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {users?.map((user) => (
          <div key={user.id} className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {user.full_name}
                </p>
                {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
              </div>
            </div>
            <Progress value={33} className="max-w-[200px]" />
            <Button variant="outline" className="ml-auto">
              Absent{" "}
              <Icons.Close className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Owner{" "}
                  <Icons.ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Viewer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view and comment.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Developer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and edit.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Billing</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and manage billing.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Owner</p>
                        <p className="text-sm text-muted-foreground">
                          Admin-level access to all resources.
                        </p>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
