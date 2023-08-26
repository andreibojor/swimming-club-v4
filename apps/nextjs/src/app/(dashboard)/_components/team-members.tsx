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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
      <CardHeader className="px-2 pb-2 md:px-6 md:pb-6">
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 md:p-6">
        {users?.map((user) => (
          <div key={user.id} className="flex flex-col gap-1">
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
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

              <Button
                variant="outline"
                className="ml-auto px-2 py-1 md:px-4 md:py-2"
              >
                Absent{" "}
                <Icons.Close className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>

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

              {/* <Popover>
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
            </Popover> */}
            </div>

            <Progress value={23} className="h-1 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
