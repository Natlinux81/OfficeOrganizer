import { Injectable } from '@angular/core';
import { TaskItems } from '../todo-list/mock-tasks';
import { TaskItem } from '../shared/task-item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getAllTasks() : TaskItem[]{
    return TaskItems;
  }

  addTask(newTask: string){
    TaskItems.push(new TaskItem(newTask))
  }

  removeTask(existingTask: TaskItem){
    var index = TaskItems.indexOf(existingTask);
    TaskItems.splice(index,1);
  }
}
