import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 'TODO' })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;
}
