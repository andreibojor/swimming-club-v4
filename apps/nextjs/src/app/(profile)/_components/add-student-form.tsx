"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import {
  Button,
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

export default function AddStudentForm({ userDetails }) {
  const supabase = createClientComponentClient();
  const supabaseClient = useSupabaseClient();
  console.log(userDetails);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const { name, phoneNumber, pool, swimmerLevel, medicalCertificate } = data;

    const { data: medicalCertificateData } = await supabaseClient.storage
      .from("medical-certificates")
      .upload(`mc-${userDetails?.id}`, medicalCertificate, {
        cacheControl: "3600",
        upsert: false,
      });

    const updateStudentPoolAction = await supabase.from("students").insert({
      id: uuidv4(),
      parent_id: uuidv4(),
      name: name,
      // phone_number: phoneNumber,
      pool: pool,
      swimmer_level: swimmerLevel,
      medical_certificate: medicalCertificate,
    });

    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <h1>user details</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
          <h1>data</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </>
      ),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          style={{
            animationDelay: "0.40s",
            animationFillMode: "forwards",
          }}
        >
          Add Student <Icons.PlusCircle className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add a student</DialogTitle>
          <DialogDescription>
            Add another student for swimming lessons
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
