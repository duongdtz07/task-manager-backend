import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Research competitors',
      description: 'Look into similar minimalist dev tools',
      status: 'DONE',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Design System setup',
      description: 'Configure Tailwind and basic variables',
      status: 'IN_PROGRESS',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Implement DnD',
      description: 'Use @dnd-kit to make board columns functional',
      status: 'TODO',
      createdAt: new Date(),
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description ?? '',
      status: createTaskDto.status ?? 'TODO',
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    if (updateTaskDto.title !== undefined) task.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined)
      task.description = updateTaskDto.description;
    if (updateTaskDto.status !== undefined) task.status = updateTaskDto.status;
    return task;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    this.tasks.splice(index, 1);
  }
}
