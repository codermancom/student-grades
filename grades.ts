import { 
  StudentAccumulator, 
  createStudentAccumulator 
} from './StudentAccumulator';
import { 
  Student, 
  ExamResult, 
  ProcessedStudentDetails
} from './Types';
import { Grade } from './GradeTypes';
import { logDebug } from './functions/logDebug';
import studentData from './data/studentData.json';
import { getGradeComment } from './functions/getGradeComment';

const createGradeChecker = (failingGrade: string) => (grade: string) => grade !== failingGrade;

const passingGrade = createGradeChecker(Grade.F);

const calculateAverageScore = (results: ExamResult[]): number => 
  results.reduce((acc, result) => acc + result.score, 0) / results.length;

// Function to process each student detail
const processStudentDetail = (student: Student): ProcessedStudentDetails => {
  const { name, age, results } = student;
  const averageScore = Math.round(calculateAverageScore(results));
  const allGrades = [...new Set(results.map((result) => result.grade))].join(', ');
  const allSubjects = [...new Set(results.map((result) => result.subject))].join(', ');
  const comments = results.flatMap((result) => result.comments || []);

  return {
    name,
    age,
    averageScore,
    allGrades,
    allSubjects,
    comments
  };
};

const loadStudents = (): Student[] => {
  let students = [];
  studentData.students.forEach((student: Student) => {
    student.results.forEach((result: ExamResult) => {
      if (result.comments === undefined) {
        result.comments = getGradeComment(result.grade);
      }
    });
    students.push(student);
  });
  return students;
};

//
// Sample usage
//

let students = loadStudents();

const studentProcessingResult = students.reduce<StudentAccumulator>((acc, student) => {
  // Process student details
  acc = {
    ...acc,
    allDetails: [...acc.allDetails, processStudentDetail(student)]
  };

  // Check if student passed at least one subject
  if (student.results.some(result => passingGrade(result.grade))) {
    acc = {
      ...acc,
      passedStudents: [...acc.passedStudents, processStudentDetail(student)]
    };
  }

  // Check if student failed all subjects
  if (student.results.every(result => !passingGrade(result.grade))) {
    acc = {
      ...acc,
      failedStudents: [...acc.failedStudents, processStudentDetail(student)]
    };
  }
  return acc;
}, createStudentAccumulator());

// Filter passed and failed students and process them
const { passedStudents, failedStudents, allDetails } = 
  studentProcessingResult;

logDebug(passedStudents, 'passedStudents');
logDebug(failedStudents, 'failedStudents');
logDebug(allDetails, 'allDetails', 'info');

// Lists of students who passed and failed with their average grade
let allStudentsSummary: string[] = allDetails.map(student => {
  let passFail = student.averageScore > 70 ? 'passed' : 'failed';
  return `${student.name} ${passFail} with an average grade of ${student.averageScore}`;
});
logDebug(allStudentsSummary, 'All students');

// List of all subjects taken by students (unique)
let uniqueSubjects = [];
allDetails.forEach((student) => {
  student.allSubjects.split(', ').forEach(subject => {
    if (uniqueSubjects.hasOwnProperty(subject)) {
      uniqueSubjects[subject]++;
    } else {
      uniqueSubjects[subject] = 1;
    }
  });
});
logDebug(uniqueSubjects, 'All subjects taken by students');

let leastInterestingSubject = Object.keys(uniqueSubjects).reduce((a, b) => uniqueSubjects[a] < uniqueSubjects[b] ? a : b);
logDebug(leastInterestingSubject, 'Least interesting Subject');