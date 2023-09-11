import { Input, Label } from "@acme/ui";

import type { FormItems } from "../page";
import FormWrapper from "./FormWrapper";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const UserInfoForm = ({
  name,
  email,
  phone,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your name, email address, and phone number."
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            autoFocus
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full"
            required
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            value={phone}
            className="w-full"
            onChange={(e) => updateForm({ phone: e.target.value })}
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
