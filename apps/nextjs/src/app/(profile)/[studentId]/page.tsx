import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/actions/createServerSupabaseClient";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getAllStudentDetails from "@/actions/getAllStudentDetails";
import getStudentAttendances from "@/actions/getStudentAttendances";
import getStudentsByParent from "@/actions/getStudentsByParent";
import getUserDetails from "@/actions/getUserDetails";
import { AccountRegistrationForm } from "@/app/(profile)/[studentId]/_components/account-registration-form";
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
  CardFooter,
  CardHeader,
  CardTitle,
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
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

import AddStudentForm from "./_components/add-student-form";
import ParentPanel from "./_components/parent-panel";
import StudentPanel from "./_components/student-panel";

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

export default async function ProfilePage({
  params,
  searchParams,
}: Record<string, string | string[] | undefined>) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const userDetails = await getUserDetails(user.id);

  // Extract the student ID from params
  const studentIdParams = params.studentId;
  // Use either the studentId from the URL or the user's own ID
  const studentId = studentIdParams || searchParams.student || `${user?.id}`;

  const studentsByParent = await getStudentsByParent(user.id);
  const sortedStudentsByParent = studentsByParent.sort((a, b) =>
    a.full_name.localeCompare(b.full_name),
  );
  const products = await getActiveProductsWithPrices();
  const attendances = await getStudentAttendances(studentId);
  const dates = attendances.map((attendance) => attendance.date);

  const allStudentDetails = await getAllStudentDetails(studentId);
  console.log(`studentIdFromParams: ${studentIdParams}`);
  console.log(`searchParams.student: ${searchParams.student}`);
  console.log("--------------------");

  return (
    <>
      <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <Card className="w-full md:w-1/3">
            <CardHeader className="pb-0">
              <Avatar className="h-[80px] w-[80px]">
                <AvatarImage
                  src={`${allStudentDetails?.avatar_url}`}
                  alt="Avatar Image"
                />
                <AvatarFallback>CSC</AvatarFallback>
              </Avatar>
              <CardTitle>{allStudentDetails?.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-4 pt-3">
                <h4 className="text-base font-medium text-muted-foreground">
                  DETAILS
                </h4>
                <div className="flex flex-col justify-between space-y-4">
                  <div className="flex items-center">
                    <Icons.Phone className="h-5 w-5 text-[#3B82F6]" />
                    <p className="ml-2 text-base font-normal leading-none">
                      Phone:
                    </p>
                    <p className="ml-2 text-base font-normal leading-none">
                      {allStudentDetails?.phone}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Icons.Waves className="h-5 w-5 text-[#3B82F6]" />
                    <p className="ml-2 text-base font-normal leading-none">
                      Pool:
                    </p>
                    <p className="ml-2 text-base font-normal leading-none">
                      {allStudentDetails?.pool}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Icons.User className="h-5 w-5 text-[#3B82F6]" />
                    <p className="ml-2 text-base font-normal leading-none">
                      Role:
                    </p>
                    <p className="ml-2 text-base font-normal leading-none">
                      {allStudentDetails?.role}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {allStudentDetails?.active ? (
                      <>
                        <Icons.Smile className="h-5 w-5 text-[#3B82F6]" />
                        <p className="ml-2 text-base font-normal leading-none">
                          Status:
                        </p>
                        <p className="ml-2 text-base font-normal leading-none">
                          Active
                        </p>
                      </>
                    ) : (
                      <>
                        <Icons.Frown className="h-5 w-5 text-[#3B82F6]" />
                        <p className="ml-2 text-base font-normal leading-none">
                          Status:
                        </p>
                        <p className="ml-2 text-base font-normal leading-none">
                          Inactive
                        </p>
                      </>
                    )}
                  </div>
                  {allStudentDetails?.swimmer_level === "beginner" && (
                    <div className="flex items-center">
                      <Icons.User className="h-5 w-5 text-[#3B82F6]" />
                      <p className="ml-2 text-base font-normal leading-none">
                        Lessons left:
                      </p>
                      <p className="ml-2 text-base font-normal leading-none">
                        {allStudentDetails?.lessons_left}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Icons.CalendarCheck className="h-5 w-5 text-[#3B82F6]" />
                    <p className="ml-2 text-base font-normal">Expires at:</p>
                    <p className="ml-2 text-base font-normal leading-none">
                      {`${new Date(
                        allStudentDetails.current_period_end,
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}`}
                    </p>
                  </div>
                  {userDetails?.role === "parent" && (
                    <AddStudentForm userDetails={userDetails} />
                  )}
                </div>
              </div>
              <AccountRegistrationForm userDetails={userDetails} />
            </CardContent>
          </Card>
          <Card className="w-full pt-6 md:w-2/3">
            <CardContent>
              {userDetails?.role === "parent" && (
                <ParentPanel
                  sortedStudentsByParent={sortedStudentsByParent}
                  dates={dates}
                  products={products}
                  allStudentDetails={allStudentDetails}
                  studentIdSearchParams={searchParams.student}
                  studentIdParams={studentIdParams}
                />
              )}

              {userDetails?.role === "student" && (
                <>
                  <StudentPanel
                    userDetails={userDetails}
                    dates={dates}
                    products={products}
                    allStudentDetails={allStudentDetails}
                  />
                </>
              )}
            </CardContent>
          </Card>
          {/* <Card className="w-full pt-6 md:w-2/3">
            {userDetails?.role === "parent" && (
              <CardContent>
                <Tabs
                  defaultValue={sortedStudentsByParent[0]?.id}
                  className="space-y-4 overflow-auto"
                >
                  <TabsList>
                    <TabsTrigger value={userDetails?.id}>
                      <Link
                        className="h-full w-full"
                        scroll={false}
                        href={`?student=${userDetails?.id}`}
                      >
                        {userDetails?.full_name}
                      </Link>
                    </TabsTrigger>
                    {sortedStudentsByParent?.map((student) => (
                      <div key={student.id}>
                        <TabsTrigger key={student.id} value={student.id}>
                          <Link
                            key={student.id}
                            className="h-full w-full"
                            scroll={false}
                            href={`?student=${student.id}`}
                          >
                            {student.full_name}
                          </Link>
                        </TabsTrigger>
                      </div>
                    ))}
                  </TabsList>
                  <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
                    <AttendancePieChart attendancesLeft={3} />
                    <SubscribeButton
                      products={products}
                      professionalStudent={false}
                    />
                    <Calendar mode="multiple" selected={dates} />
                  </div>
                </Tabs>
              </CardContent>
            )}
            {userDetails?.role === "student" && (
              <CardContent>
                <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
                  <AttendancePieChart attendancesLeft={3} />
                  <Calendar mode="multiple" selected={dates} />
                </div>
              </CardContent>
            )}
          </Card> */}
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
    </>
  );
}
