"use client";

import { useRef } from "react";
import { useDate } from "@/store/store";

export const StoreInitializer = ({ date }: { date: Date }) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useDate.setState({ date });
    initialized.current = true;
  }

  return null;
};
