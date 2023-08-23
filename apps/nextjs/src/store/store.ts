import getPresentDate from "@/actions/getPresentDate";
import { create } from "zustand";

interface DateInterface {
  date: Date;
}

export const useStore = create<DateInterface>((set) => ({
  date: new Date(),
}));
