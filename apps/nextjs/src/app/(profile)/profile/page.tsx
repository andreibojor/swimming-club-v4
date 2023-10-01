import getStudentAttendances from "@/actions/getStudentAttendances";
import getUserDetails from "@/actions/getUserDetails";
import { marketingFeatures } from "@/app/config";
import { MultiStepForm } from "@/app/multi-step-form/MultiStepForm";
import AttendancePieChart from "@/components/attendance-piechart";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default async function ProfilePage() {
  const userDetails = await getUserDetails();

  const attendances = await getStudentAttendances();
  const selectedDates = attendances.map((attendance) => attendance.date);
  console.log(userDetails);

  return (
    <>
      <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <Avatar className="h-[80px] w-[80px]">
                <AvatarImage src={userDetails?.user.avatar_url} alt="rick" />
                <AvatarFallback>A F </AvatarFallback>
              </Avatar>
              <CardTitle>{userDetails?.user.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  DETAILS
                </h4>
                <div className="flex flex-col justify-between space-y-4">
                  <p className="text-sm font-medium leading-none">
                    Phone: {userDetails?.user.phone}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Pool: {userDetails?.pool}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Role: {userDetails?.user.role}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Status: {userDetails?.active ? `Active` : `Inactive`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardTitle>{/* Rick Sanchez */}</CardTitle>
              <CardDescription>
                {/* Anyone with the link can view this document. */}
              </CardDescription>
            </CardHeader>
            {/* className="flex flex-col items-center justify-between md:flex-row" */}
            <CardContent>
              <Tabs defaultValue="andrei-bojor" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="andrei-bojor">Andrei Bojor</TabsTrigger>
                  <TabsTrigger value="sergiu-bojor">Sergiu Bojor</TabsTrigger>
                </TabsList>
                {userDetails?.user.role === "parent" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        style={{
                          animationDelay: "0.40s",
                          animationFillMode: "forwards",
                        }}
                      >
                        Add Student{" "}
                        <Icons.PlusCircle className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[650px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Add another student for swimming lessons
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value="0751 123 456"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid w-full grid-cols-4 items-center gap-4">
                          <Label htmlFor="file" className="text-right">
                            Adeverinta medicala
                          </Label>
                          <Input
                            id="picture"
                            type="file"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  ""
                )}

                {/* TAB CONTENT */}
                <TabsContent value="andrei-bojor" className="space-y-4">
                  <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
                    <AttendancePieChart attendancesLeft={3} />
                    <Calendar mode="multiple" selected={selectedDates} />

                    {/* <Suspense
                      fallback={
                        <LoadingCard
                          title="Recent Ingestions"
                          description="Loading recent ingestions..."
                          className="col-span-7 md:col-span-2 lg:col-span-3"
                        />
                      }
                    ></Suspense> */}
                  </div>
                </TabsContent>
                <TabsContent value="sergiu-bojor" className="space-y-4">
                  <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
                    <AttendancePieChart attendancesLeft={3} />
                    <Calendar mode="multiple" selected={selectedDates} />

                    {/* <Suspense
                      fallback={
                        <LoadingCard
                          title="Recent Ingestions"
                          description="Loading recent ingestions..."
                          className="col-span-7 md:col-span-2 lg:col-span-3"
                        />
                      }
                    ></Suspense> */}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between gap-0 md:gap-5">
          <div className="none md:w-1/3"></div>
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardTitle>Invoice</CardTitle>
              <CardDescription>
                Anyone with the link can view this document.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {marketingFeatures.map((feature) => (
            <Card key={feature.title} className={cn("p-2")}>
              <CardHeader>{feature.icon}</CardHeader>
              <CardContent className="space-y-2">
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.body}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <MultiStepForm />
    </>
  );
}
