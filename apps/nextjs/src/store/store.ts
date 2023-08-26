import { create } from "zustand";

export interface DateInterface {
  setDateState: (state: Date | undefined) => void;
  date: Date | undefined;
}

export const useDate = create<DateInterface>((set) => ({
  date: undefined,
  setDateState: (state: Date | undefined) => set({ date: state }),
}));
