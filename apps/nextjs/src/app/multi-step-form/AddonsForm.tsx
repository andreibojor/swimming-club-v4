import { Checkbox } from "@acme/ui";

import FormWrapper from "./FormWrapper";
import type { FormItems } from "./page";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const AddonsForm = ({ addOns, yearly, updateForm }: stepProps) => {
  function handleCheckboxChange(addOnId: number, checked: boolean) {
    const updatedAddOns = addOns.map((addOn) => {
      if (addOn.id === addOnId) {
        return {
          ...addOn,
          checked,
        };
      } else {
        return addOn;
      }
    });
    updateForm({ addOns: updatedAddOns });
  }

  return (
    <FormWrapper
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience"
    >
      <div className="flex flex-col gap-3">
        {addOns.map((addOn) => (
          <div
            className={`flex items-center gap-3 rounded-md border border-neutral-600 p-3 ${
              addOn.checked ? "border-[#77f6aa] bg-neutral-900" : ""
            } outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] md:gap-5 md:p-5`}
            key={addOn.id}
          >
            <Checkbox
              id="online-service"
              checked={addOn.checked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(addOn.id, checked as boolean)
              }
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="online-service"
                  className="font-semibold text-white"
                >
                  {addOn.title}
                </label>
                <p className="text-sm">{addOn.subtitle}</p>
              </div>
              <p className="text-[#77f6aa]">
                {`+$${yearly ? addOn.price * 10 : addOn.price}${
                  yearly ? "/yr" : "/mo"
                }`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default AddonsForm;
