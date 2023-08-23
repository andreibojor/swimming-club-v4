import { create } from "zustand";

interface DateInterface {
  // TODO: define the correct interface for setNewDate
  setNewDate: unknown;
  date: Date;
}

const date = new Date(`2023-08-22T09:23:17.270Z`);

export const useDate = create<DateInterface>((set) => ({
  date: date,
  setNewDate: () => set((state) => ({ date: state.date })),
}));
