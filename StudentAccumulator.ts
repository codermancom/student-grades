import { ProcessedStudentDetails } from './Types';

export interface StudentAccumulator {
  passedStudents: ProcessedStudentDetails[];
  failedStudents: ProcessedStudentDetails[];
  allDetails: ProcessedStudentDetails[];
}

export function createStudentAccumulator(): StudentAccumulator {
  return {
    passedStudents: [],
    failedStudents: [],
    allDetails: []
  };
}