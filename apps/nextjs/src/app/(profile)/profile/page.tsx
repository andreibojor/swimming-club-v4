import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getStudentAttendances from "@/actions/getStudentAttendances";
import getUserDetails from "@/actions/getUserDetails";
import AttendancePieChart from "@/components/attendance-piechart";
import { MultiStepForm } from "@/components/multi-step-form";
import SubscribeButton from "@/components/subscribe-button";
import SubscribeModal from "@/components/subscribe-modal";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

import AddStudentForm from "../_components/add-student-form";

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
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userDetails = await getUserDetails(user.id);
  console.log(userDetails);
  const products = await getActiveProductsWithPrices();
  const attendances = await getStudentAttendances();
  const selectedDates = attendances.map((attendance) => attendance.date);

  return (
    <>
      <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
        <SubscribeButton products={products} />
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <Avatar className="h-[80px] w-[80px]">
                <AvatarImage
                  src={`${userDetails?.avatar_url}`}
                  alt="Avatar Image"
                />
                <AvatarFallback>CSC</AvatarFallback>
              </Avatar>
              <CardTitle>{userDetails?.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  DETAILS
                </h4>
                <div className="flex flex-col justify-between space-y-4">
                  <p className="text-sm font-medium leading-none">
                    Phone: {`${userDetails?.phone}`}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    {/* Pool: {userDetails?.pool} */}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Role: {userDetails?.role}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    {/* Status: {userDetails?.active ? `Active` : `Inactive`} */}
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

                {userDetails?.role === "parent" ? (
                  <AddStudentForm userDetails={userDetails} />
                ) : (
                  ""
                )}

                {/* TAB CONTENT */}
                <TabsContent value="andrei-bojor" className="space-y-4">
                  <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
                    {/* <AttendancePieChart attendancesLeft={3} /> */}
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
                    {/* <AttendancePieChart attendancesLeft={3} /> */}
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
      </div>
      <MultiStepForm userDetails={userDetails} />
    </>
  );
}
