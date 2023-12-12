import { create } from "zustand";

export interface IStudentIdStripe {
  studentIdStripe: string;
  setStudentIdStripeState: (state: string) => void;
}

export const useStudentIdStripe = create<IStudentIdStripe>((set) => ({
  studentIdStripe: "", // Initialize with an empty string
  setStudentIdStripeState: (state: string) => {
    set({ studentIdStripe: state }); // Update the studentId state
  },
}));
