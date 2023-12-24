"use client";

import { useState } from "react";
import SubscribeButton from "@/app/(profile)/[studentId]/_components/subscribe-button";
import AttendancePieChart from "@/components/attendance-piechart";

import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@acme/ui";
import * as Icons from "@acme/ui/src/icons";

export default function StudentPanel({ dates, products, allStudentDetails }) {
  const [lessons, setLessons] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.preventDefault();
    const inputLessons = Number(e.target.value);

    // Check if inputLessons is a valid number
    if (!isNaN(inputLessons) && inputLessons >= 1) {
      setLessons(inputLessons);
    } else {
      // If not a valid number or less than 1, default to 1
      setLessons(1);
    }
  };

  const isBeginner = allStudentDetails?.swimmer_level === "beginner";
  const monthlySubscriptionProduct = isBeginner ? products[0] : products[1];
  const lessonProduct = products[2];

  return (
    <>
      <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
        {/* <AttendancePieChart attendancesLeft={allStudentDetails.lessons_left} /> */}
        <Calendar mode="multiple" selected={dates} />
      </div>

      <div className="flex flex-col justify-between gap-1 md:flex-row">
        {/* Monthly Subscription Card */}
        <Card className="md:1/2 w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
            <CardDescription>Subscribe for our monthly plan</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col space-y-1">
                <span className="flex items-center text-lg">
                  <Icons.Waves className="mr-2 h-4 w-4 text-primary" />8 lessons
                </span>
                <span className="flex items-center text-lg">
                  <Icons.Waves className="mr-2 h-4 w-4 text-primary" />
                  available for 1 month
                </span>
                {/* <span className="font-normal leading-snug text-muted-foreground">
                  These cookies are essential in order to use the website and
                  use its features.
                </span> */}
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <SubscribeButton
              products={[monthlySubscriptionProduct]}
              swimmerLevel={allStudentDetails?.swimmer_level}
              studentIdStripe={allStudentDetails?.id}
            />
          </CardFooter>
        </Card>

        {/* Independent Lessons Card */}
        {isBeginner && (
          <Card className="md:1/2 flex w-full flex-col justify-between">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Independent Lessons</CardTitle>
              <CardDescription>
                Enter the number of lessons you want to order
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="lesson_number"
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubscribeButton
                products={[lessonProduct]}
                swimmerLevel={allStudentDetails?.swimmer_level}
                studentIdStripe={allStudentDetails?.id}
                lessons={lessons}
              />
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
