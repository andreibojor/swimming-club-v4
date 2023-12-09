"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const profileFormSchema = z.object({
  // TODO: https://github.com/shadcn-ui/ui/issues/884
  name: z.string().min(3),
  phoneNumber: z
    .string()
    .min(10)
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Your phone number contains other characters than digits.",
    }),
  pool: z.string({
    required_error: "Please select the performance level.",
  }),
  swimmerLevel: z.string({
    required_error: "Please select the performance level.",
  }),
  medicalCertificate: z
    .instanceof(Blob, { message: "Medical Certificate is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size should be less than 5 MB.",
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Only .pdf files are allowed",
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  medicalCertificate: null,
};

export default function SwimmerCard({ student, children }) {
  const [certificateError, setCertificateError] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [studentData, setStudentData] = useState({} as any);

  const supabase = createClientComponentClient();
  const getStudentAttendances = async (studentId: string) => {
    const { data } = await supabase
      .from("attendance_record")
      .select("*")
      .eq("student_id", studentId);

    if (!data) return [];

    const formattedAttendances = data.map((attendance: any) => ({
      id: attendance.id,
      date: new Date(attendance.date),
    }));

    const dates = formattedAttendances.map((attendance) => attendance.date);
    setStudentAttendances(dates);
    getStudentData(studentId);
  };

  // const getInitials = (name: string) => {
  //   const initials = name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("");

  //   return initials;
  // };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const getStudentData = async (userId: string): Promise => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", userId)
      .single();

    error && console.log(error);
    const allData = {
      ...userData,
      ...studentData,
    };

    setStudentData(allData);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    // const { name, pool, swimmerLevel, medicalCertificate } = data;
    // const newStudentId = uuidv4();

    // const { data: medicalCertificateData } = await supabaseClient.storage
    //   .from("medical-certificates")
    //   .upload(`mc-${newStudentId}`, medicalCertificate, {
    //     cacheControl: "3600",
    //     upsert: false,
    //   });

    // const updateStudentPoolAction = await supabase.from("students").insert({
    //   id: newStudentId,
    //   full_name: name,
    //   parent_id: userDetails.id,
    //   // phone_number: phoneNumber,
    //   pool: pool,
    //   professional_student: swimmerLevel,
    //   medical_certificate_path: medicalCertificateData?.path,
    // });

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <>
    //       <h1>user details</h1>
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //       <h1>data</h1>
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     </>
    //   ),
    // });

    setIsOpenDialog(false);
    router.refresh();
  };

  async function getMedicalCertificate() {
    try {
      const { data: studentData, error } = await supabase
        .from("students")
        .select("medical_certificate_path")
        .eq("id", student.id);

      const medicalCertificatePath = studentData[0]?.medical_certificate_path;

      const { data: medicalCertificateUrl } = await supabase.storage
        .from("medical-certificates")
        .getPublicUrl(medicalCertificatePath);

      window.open(medicalCertificateUrl.publicUrl, "_blank");
    } catch (error) {
      console.error("An error occurred:", error);
      setCertificateError(true);
    }
  }

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          style={{
            animationDelay: "0.40s",
            animationFillMode: "forwards",
          }}
          onClick={() => getStudentAttendances(student.id)}
          // className="w-full flex-1 justify-start px-2 py-1.5 text-sm font-[400]"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="mb-6 items-center">
          <Avatar className="mb-2 h-16 w-16">
            <AvatarImage src={`${studentData.avatar_url}`} />
            <AvatarFallback className="text-xl">
              {/* {studentData && getInitials(studentData?.full_name)} */}
            </AvatarFallback>
          </Avatar>
          <DialogTitle>{studentData.full_name}</DialogTitle>
          {/* <DialogDescription>
            Add another student for swimming lessons
          </DialogDescription> */}
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col justify-between space-y-6">
            <div className="flex items-center">
              <Icons.User color="#2563eb" />
              <p className="ml-4 text-base font-normal">Parent:</p>
              <p className="ml-2 text-base font-semibold leading-none">
                {`${studentData.parent_id}`}
              </p>
            </div>

            <div className="flex items-center">
              <Icons.Phone color="#2563eb" />
              <p className="ml-4 text-base font-normal">Phone:</p>
              <p className="ml-2 text-base font-semibold leading-none">
                {`${studentData.phone}`}
              </p>
            </div>

            <div className="flex items-center">
              <Icons.Waves color="#2563eb" />
              <p className="ml-4 text-base font-normal">Pool:</p>
              <p className="ml-2 text-base font-semibold leading-none">
                {studentData.pool}
              </p>
            </div>

            <div className="flex items-center">
              <Icons.GraduationCap color="#2563eb" />
              <p className="ml-4 text-base font-normal">Class:</p>
              <p className="ml-2 text-base font-semibold leading-none">
                {` ${
                  studentData.professional_student ? "Advanced" : "Beginner"
                }`}
              </p>
            </div>

            <div className="flex items-center">
              <Icons.Calendar color="#2563eb" />
              <p className="ml-4 text-base font-normal">Lessons left:</p>
              <p className="ml-2 text-base font-semibold leading-none">
                {studentData.lessons_left}
              </p>
            </div>
            <p className="text-sm font-medium leading-none">
              Role: {studentData?.role}
            </p>
            <p className="text-sm font-medium leading-none">
              Status: {studentData?.active ? `Active` : `Inactive`}
            </p>
            {/* <AddStudentForm userDetails={userDetails} /> */}
          </div>
        </div>

        <div className="mt-5">
          <Button
            disabled={certificateError}
            onClick={() => getMedicalCertificate()}
          >
            <Icons.Eye />
          </Button>
        </div>
        {/* <Calendar mode="multiple" /> */}
        <Calendar
          mode="multiple"
          selected={studentAttendances}
          className="flex justify-center"
        />
        {/* <Calendar mode="multiple" /> */}
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ionut Popescu" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="swimmerLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the level of your performance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FALSE">Beginner</SelectItem>
                      <SelectItem value="TRUE">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can request your swimming teacher to promote you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pool Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the level of your performance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cluj-Napoca">Cluj-Napoca</SelectItem>
                      <SelectItem value="Dej">Dej</SelectItem>
                      <SelectItem value="Sancraiu">Sâncraiu</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can request your swimming teacher to promote you
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0751 123 456" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Certificate</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      placeholder="MedicalCertificate.pdf"
                      // Use event.target.files to access the uploaded file
                      onChange={(e) => {
                        // Update the form state with the selected file
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload your medical certificate in .pdf format.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
}
