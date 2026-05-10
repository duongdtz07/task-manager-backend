import { IsEnum, IsOptional, IsString } from 'class-validator';
import type { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status?: TaskStatus;
}
