"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
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
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  medicalCertificate: null,
};

export function MultiStepForm() {
  const { userDetails } = useUser();
  const supabase = createClientComponentClient();
  const [formStep, setFormStep] = useState(0);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const { phoneNumber, medicalCertificate } = data;
    console.log(userDetails);
    const updateUserPhoneAction = await supabase
      .from("users")
      .update({ phone: phoneNumber })
      .eq("id", userDetails?.id);

    const { data: medicalCertificateData } = await supabaseClient.storage
      .from("medical-certificates")
      .upload(`mc-${userDetails?.id}`, medicalCertificate, {
        cacheControl: "3600",
        upsert: false,
      });

    const updateMedicalCertificatePathAction = await supabase
      .from("students")
      .update({ medical_certificate_path: medicalCertificateData?.path })
      .eq("id", userDetails?.id);

    const updateCompletedRegistrationAction = await supabase
      .from("users")
      .update({ completed_registration: true })
      .eq("id", userDetails?.id);

    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <h1>user details</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(userDetails, null, 2)}
            </code>
          </pre>
          <h1>data</h1>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </>
      ),
    });
  };

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // Add this state at the beginning of your component
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const supabaseClient = useSupabaseClient();
  useEffect(() => {
    userDetails?.completed_registration
      ? setIsOpenDialog(false)
      : setIsOpenDialog(true);
  }, [userDetails?.completed_registration]);

  return (
    <>
      <Dialog
        open={isOpenDialog}
        onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Finish registration process</DialogTitle>
            <DialogDescription>
              Add the necessary details for sign up
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* STEP 1 */}
              <motion.div
                className={cn("space-y-3", { hidden: formStep === 1 })}
                animate={{
                  translateX: `-${formStep * 100}%`,
                }}
              >
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0751 123 456" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
                      </FormDescription> */}
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
                        You can request your swimming teacher to promote you{" "}
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
                          onChange={(event) => {
                            const uploadedFile = event.target.files[0];
                            setSelectedFile(uploadedFile);
                            // No need to manipulate the file list here
                            field.onChange(uploadedFile);
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
              </motion.div>

              {/* STEP 2 */}
              <motion.div
                className={cn("space-y-3", { hidden: formStep === 0 })}
                animate={{
                  translateX: `${100 - formStep * 100}%`,
                }}
              >
                <RadioGroup
                  defaultValue="cash"
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="cash"
                      id="cash"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-lg hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Icons.Wallet className="mb-3 h-10 w-10" />
                      Cash
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-lg hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Icons.CreditCard className="mb-3 h-10 w-10" />
                      Card
                    </Label>
                  </div>
                </RadioGroup>
                <FormDescription>
                  Select the desired payment method.
                </FormDescription>
              </motion.div>
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  className={cn({ hidden: formStep == 0 })}
                  onClick={() => setFormStep(0)}
                >
                  Go Back
                </Button>

                <Button
                  type="button"
                  className={cn("ml-auto", {
                    hidden: formStep == 1,
                  })}
                  onClick={() => {
                    form.trigger([
                      "phoneNumber",
                      "swimmerLevel",
                      "medicalCertificate",
                    ]);

                    // const phoneNumberState = form.getFieldState("phoneNumber");
                    // const swimmerLevelState =
                    //   form.getFieldState("swimmerLevel");
                    // const medicalCertificateState =
                    //   form.getFieldState("medicalCertificate");
                    // if (!phoneNumberState.isDirty || phoneNumberState.invalid)
                    //   return;
                    // if (!swimmerLevelState.isDirty || swimmerLevelState.invalid)
                    //   return;
                    // if (
                    //   !medicalCertificateState.isDirty ||
                    //   medicalCertificateState.invalid
                    // )
                    //   return;

                    setFormStep(1);
                  }}
                >
                  Next Step
                </Button>

                <Button type="submit" className={cn({ hidden: formStep == 0 })}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}