"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function SwimmerCard({ student }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const supabase = createClientComponentClient();
  const supabaseClient = useSupabaseClient();

  const router = useRouter();

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return initials;
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

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
          // className="w-full flex-1 justify-start px-2 py-1.5 text-sm font-[400]"
        >
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`${student.avatar_url}`} />
            <AvatarFallback className="text-xl">
              {getInitials(student.full_name)}
            </AvatarFallback>
          </Avatar>
          <DialogTitle>{student.full_name}</DialogTitle>
          {/* <DialogDescription>
            Add another student for swimming lessons
          </DialogDescription> */}
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col justify-between space-y-4">
            <p className="text-sm font-medium leading-none">
              Parent: {`${student.phone}`}
            </p>
            <p className="text-sm font-medium leading-none">
              Phone: {`${student.phone}`}
            </p>
            <p className="text-sm font-medium leading-none">
              Pool: {student.pool}
            </p>
            <p className="text-sm font-medium leading-none">
              Class:
              {` ${student.professional_student ? "Advanced" : "Beginner"}`}
            </p>
            <p className="text-sm font-medium leading-none">
              Lessons Left: {student.lessons_left}
            </p>
            {/* <p className="text-sm font-medium leading-none">
              Role: {userDetails?.role}
            </p> */}
            {/* <p className="text-sm font-medium leading-none">
              Status: {userDetails?.active ? `Active` : `Inactive`}
            </p> */}
            {/* <AddStudentForm userDetails={userDetails} /> */}
          </div>
        </div>
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
