import { create } from "zustand";

interface DateInterface {
  // TODO: define the correct interface for setNewDate
  setNewDate: unknown;
  date: Date | undefined;
}

export const useDate = create<DateInterface>((set) => ({
  date: undefined,
  setNewDate: (state: string) => set({ date: state }),
}));
