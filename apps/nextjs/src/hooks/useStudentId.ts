import { create } from "zustand";

export interface StudentIdInterface {
  setStudentIdState: (state: string) => void;
  studentId: string;
}

export const useStudentId = create<StudentIdInterface>((set) => ({
  studentId: "", // Initialize with an empty string
  setStudentIdState: (state: string) => {
    set({ studentId: state }); // Update the studentId state
  },
}));
