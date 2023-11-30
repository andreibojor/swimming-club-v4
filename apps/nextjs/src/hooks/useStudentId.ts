import { create } from "zustand";

export interface StudentIdInterface {
  studentId: string;
  setStudentId: (state: string) => void;
}

export const useStudentId = create<StudentIdInterface>((set) => ({
  studentId: "", // Initialize with an empty string
  setStudentId: (state: string) => {
    set({ studentId: state }); // Update the studentId state
  },
}));
