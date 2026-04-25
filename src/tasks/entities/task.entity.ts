export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}
