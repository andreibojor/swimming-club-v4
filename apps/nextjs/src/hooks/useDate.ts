import { create } from "zustand";

export interface DateInterface {
  setDateState: (state: Date | undefined) => void;
  date: Date | undefined;
}

export const useDate = create<DateInterface>((set) => ({
  date: new Date(), // Initialize with today's date
  setDateState: (state: Date | undefined) => set({ date: state }),
}));
