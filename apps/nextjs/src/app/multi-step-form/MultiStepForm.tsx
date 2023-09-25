"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`)
    .refine((files) => files.length <= 5, `Maximum of 5 files are allowed.`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Each file size should be less than 5 MB.`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_FILE_TYPES.includes(file.type),
        ),
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
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function MultiStepForm() {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // Add this state at the beginning of your component
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const { userDetails } = useUser();

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
                          <SelectItem value="m@example.com">
                            Beginner
                          </SelectItem>
                          <SelectItem value="m@google.com">Advanced</SelectItem>
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
                  render={({ field }) => {
                    // Destructure the field object to separate the value property
                    const { value, ...restOfField } = field;

                    return (
                      <FormItem>
                        <FormLabel>Medical Certificate</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf"
                            placeholder="MedicalCertificate.pdf"
                            // Spread only the rest of the properties excluding value
                            {...restOfField}
                            onChange={(event) => {
                              setSelectedFiles(event.target.files);

                              // Triggered when user uploaded a new file
                              // FileList is immutable, so we need to create a new one
                              const dataTransfer = new DataTransfer();

                              if (selectedFiles) {
                                Array.from(selectedFiles).forEach((file) =>
                                  dataTransfer.items.add(file),
                                );
                              }

                              // Add newly uploaded medicalCertificate
                              Array.from(event.target.files!).forEach((file) =>
                                dataTransfer.items.add(file),
                              );

                              // Validate and update uploaded file
                              const newFiles = dataTransfer.files;
                              field.onChange(newFiles);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Please upload your medical certificate in .pdf format.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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

                    const phoneNumberState = form.getFieldState("phoneNumber");
                    const swimmerLevelState =
                      form.getFieldState("swimmerLevel");
                    const medicalCertificateState =
                      form.getFieldState("medicalCertificate");
                    if (!phoneNumberState.isDirty || phoneNumberState.invalid)
                      return;
                    if (!swimmerLevelState.isDirty || swimmerLevelState.invalid)
                      return;
                    if (
                      !medicalCertificateState.isDirty ||
                      medicalCertificateState.invalid
                    )
                      return;

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
