"use client";

import { useState } from "react";
import Image from "next/image";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import arcadeImg from "public/arcade.png";
import advancedImg from "public/game-console.png";
import proImg from "public/online-gaming.png";

import { Label, Switch } from "@acme/ui";

import FormWrapper from "./FormWrapper";
import type { FormItems } from "./page";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

type Plan = "arcade" | "advanced" | "pro";

const PlanForm = ({ updateForm, plan, yearly }: stepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = useState(yearly);
  const [planSelected, setPlanSelected] = useState<Plan>(plan);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev);
    updateForm({ yearly: yearlyUpdated });
  };

  const handleValueChange = (planSelected: Plan) => {
    if (planSelected) {
      setPlanSelected(planSelected);
      updateForm({ plan: planSelected });
    }
  };

  return (
    <FormWrapper
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <ToggleGroup.Root
        orientation="horizontal"
        className="my-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0"
        type="single"
        value={planSelected}
        onValueChange={handleValueChange}
      >
        <ToggleGroup.Item
          value="arcade"
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <Image src={arcadeImg} alt="arcade" width="40" height="40" />
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Arcade</p>
            <p className="text-sm">{yearly ? "$90/yr" : "$9/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="advanced"
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <Image src={advancedImg} alt="advanced" width="40" height="40" />
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Advanced</p>
            <p className="text-sm">{yearly ? "$120/yr" : "$12/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>

        <ToggleGroup.Item
          className="flex aspect-square h-24 items-start gap-3 rounded-md border border-neutral-600 p-3 outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
          value="pro"
        >
          <Image src={proImg} alt="pro" width="40" height="40" />
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="font-semibold text-white">Pro</p>
            <p className="text-sm">{yearly ? "$150/yr" : "$15/mo"}</p>
            {yearly && (
              <span className="text-sm text-white">2 months free</span>
            )}
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div className="flex w-full items-center justify-center rounded-md bg-neutral-900 p-3">
        <div className="flex items-center gap-6">
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "" : "text-[#77f6aa]"}
          >
            Monthly
          </Label>
          <Switch
            id="airplane-mode"
            checked={yearlyUpdated}
            onCheckedChange={handleCheckedChange}
          />
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "text-[#77f6aa]" : ""}
          >
            Yearly
          </Label>
        </div>
      </div>
    </FormWrapper>
  );
};

export default PlanForm;
