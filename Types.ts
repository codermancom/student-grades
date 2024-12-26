export type ExamResult = {
  subject: string;
  score: number;
  grade: string;
  comments?: string;
}

export type Student = {
  name: string;
  age: number;
  results: ExamResult[];
}

export type ProcessedStudentDetails = Pick<Student, 'name' | 'age'> & {
  averageScore: number;
  allGrades: string;
  allSubjects: string;
  comments: string[];
}

export type StudentSummary = {
  totalStudents: number;
  averageScore: number;
  allGrades: string;
  allSubjects: string;
  comments: string[];
}