import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import getStudentAttendances from "@/actions/getStudentAttendances";
import getUserDetails from "@/actions/getUserDetails";
import { marketingFeatures } from "@/app/config";
import AttendancePieChart from "@/components/attendance-piechart";

// import Balancer from "react-wrap-balancer";

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
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "@acme/ui";

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
  // TODO: fetch the user's attendances here and send them through props on the calendar
  const { user_metadata: userDetails } = await getUserDetails();
  const attendances = await getStudentAttendances();
  const selectedDates = attendances.map((attendance) => attendance.date);
  const supabase = createServerSupabaseClient();
  console.log(userDetails);
  // const { data: studentData, error: studentError } = await supabaseClient
  // .from("students")
  // .select("lessons_left")
  // .eq("id", studentId);
  return (
    <>
      <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <Avatar className="h-[80px] w-[80px]">
                <AvatarImage src={userDetails?.avatar_url} alt="rick" />
                <AvatarFallback>A F </AvatarFallback>
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
                    Email: {userDetails?.email}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Status: Active !!
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Role: role no defined !!
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Contact: +1 (479) 232-9151 !!
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Pool: Dej !!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-2/3">
            {/* <CardHeader>
              <CardTitle>Rick Sanchez</CardTitle>
              <CardDescription>
                Anyone with the link can view this document.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="flex flex-col items-center justify-between md:flex-row">
              <AttendancePieChart attendancesLeft={3} />
              <Calendar mode="multiple" selected={selectedDates} />
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
    </>
  );
}
