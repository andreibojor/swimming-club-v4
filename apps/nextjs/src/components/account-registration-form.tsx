"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@acme/ui";

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
  userRole: z.string({
    required_error: "Please select your role.",
  }),
  phoneNumber: z
    .string()
    .min(10)
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Your phone number contains other characters than digits.",
    }),
  swimmerLevel: z.string({
    required_error: "Please select the performance level.",
  }),
  pool: z.string({
    required_error: "Please select the pool location.",
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

export function AccountRegistrationForm({ userDetails }) {
  const supabase = createClientComponentClient();
  const [formStep, setFormStep] = useState(0);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    userDetails?.completed_registration
      ? setIsOpenDialog(false)
      : setIsOpenDialog(true);
  }, []);

  const router = useRouter();

  const onSubmit = async (data: ProfileFormValues) => {
    const { phoneNumber, medicalCertificate, pool, userRole, swimmerLevel } =
      data;

    // in users table
    const updateUserTableAction = await supabase
      .from("users")
      .update({
        phone: phoneNumber,
        role: userRole,
        completed_registration: true,
      })
      .eq("id", userDetails?.id);

    const { data: medicalCertificateData } = await supabaseClient.storage
      .from("medical-certificates")
      .upload(`mc-${userDetails?.id}`, medicalCertificate, {
        cacheControl: "3600",
        upsert: false,
      });

    // in students table
    const updateStudentPoolAction = await supabase
      .from("students")
      .update({
        pool: pool,
        professional_student: swimmerLevel,
        parent_id: userDetails?.id,
        active: false,
        medical_certificate_path: medicalCertificateData?.path,
      })
      .eq("id", userDetails?.id);

    setIsOpenDialog(false);

    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <h1>user details</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"></pre>
          <h1>data</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </>
      ),
    });

    router.refresh();
  };

  return (
    <>
      <Dialog
        open={isOpenDialog}
        onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
      >
        <DialogContent className="sm:max-w-[450px]">
          <ScrollArea className="TEST max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Finish registration process</DialogTitle>
              <DialogDescription>
                Add the necessary details for sign up
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="userRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select your role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your user role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormDescription>
                  Select the desired payment method.
                </FormDescription>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0751123456" {...field} />
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
                        {/* <Link href="/examples/forms">email settings</Link>. */}
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
                          <SelectItem value="Cluj-Napoca">
                            Cluj-Napoca
                          </SelectItem>
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
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
