import { create } from "zustand";

export interface IStudentIdForStripe {
  studentIdForStripe: string;
  setStudentIdForStripeState: (state: string) => void;
}

export const useStudentIdForStripe = create<IStudentIdForStripe>((set) => ({
  studentIdForStripe: "", // Initialize with an empty string
  setStudentIdForStripeState: (state: string) => {
    set({ studentIdForStripe: state }); // Update the studentId state
  },
}));
