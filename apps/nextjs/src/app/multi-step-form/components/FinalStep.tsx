"use client";

import { Separator } from "@acme/ui";

import type { FormItems } from "../page";
import FormWrapper from "./FormWrapper";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ yearly, plan, addOns, goTo }: StepProps) => {
  let planPrice = 0;
  switch (plan) {
    case "arcade":
      planPrice = 9;
      break;
    case "advanced":
      planPrice = 12;
      break;
    case "pro":
      planPrice = 15;
      break;
    default:
      planPrice = 0;
      break;
  }

  const filteredAddOns = addOns.filter((addOn) => addOn.checked === true);

  const totalAddOnsPrice = filteredAddOns?.reduce(
    (acc, obj) => acc + obj.price,
    0,
  );
  console.log(totalAddOnsPrice);

  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="">
        <div className="mt-2 rounded-md border border-neutral-700 bg-neutral-900 p-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                {`${plan.charAt(0).toUpperCase() + plan.slice(1)} (${
                  yearly ? "Yearly" : "Monthly"
                })`}
              </h4>
              <button
                onClick={() => goTo(1)}
                className="text-sm text-[#6fe79f]"
              >
                Change
              </button>
            </div>
            <p className="font-semibold text-white">{`$${
              yearly ? planPrice * 10 : planPrice
            }${yearly ? "/yr" : "/mo"}`}</p>
          </div>
          {filteredAddOns.length > 0 && <Separator className="my-4" />}
          {filteredAddOns?.map((addOn) => (
            <div
              className="my-2 flex items-center justify-between"
              key={addOn.id}
            >
              <p className="text-neutral-400">{addOn.title}</p>
              <p className="">{`$${yearly ? addOn.price * 10 : addOn.price}${
                yearly ? "/yr" : "/mo"
              }`}</p>
            </div>
          ))}
        </div>
        <div className="my-4 flex items-center justify-between px-4">
          <p className="text-neutral-400">
            Total (per {yearly ? "year" : "month"})
          </p>
          <p className="font-semibold text-[#6fe79f] md:text-lg">
            +$
            {yearly
              ? planPrice * 10 + totalAddOnsPrice * 10
              : planPrice + totalAddOnsPrice}
            /{yearly ? "yr" : "mo"}
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

export default FinalStep;
