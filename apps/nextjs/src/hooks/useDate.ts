import { create } from "zustand";

export interface DateInterface {
  setDateState: (state: Date) => void;
  date: Date;
}

export const useDate = create<DateInterface>((set) => ({
  date: new Date(), // Initialize with today's date
  setDateState: (state: Date) => set({ date: state }),
}));
