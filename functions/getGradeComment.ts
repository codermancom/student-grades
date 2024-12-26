import { GradeComment } from '../GradeTypes';

export const getGradeComment = (grade: string): string => GradeComment[grade]