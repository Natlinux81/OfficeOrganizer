import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskItem } from '../shared/task-item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const taskItems: TaskItem [] = [
      new TaskItem (1,'TestItem'),
      new TaskItem(2, "Visit Ann"),
        new TaskItem(3,"Call Dad"),
        new TaskItem(4, "Go to the gym"),
        new TaskItem(5, "Wash the dishes"),
        new TaskItem(6,"Shop for the party")
    ]
    return {taskItems};
  }
}


