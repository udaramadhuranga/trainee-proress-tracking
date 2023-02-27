import { Exercise } from './exercise';
import { User } from './user';

export class UserExercise {
  id: string;
  traineeId: User;
  exercise: Exercise;
  Assined_Date: Date;
  Completed_Date: Date;
  status: string;
  comment: string;
}
