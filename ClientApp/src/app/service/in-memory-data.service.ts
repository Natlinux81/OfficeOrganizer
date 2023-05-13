import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskItem } from '../shared/task-item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const taskItems: TaskItem [] = [
      new TaskItem ('TestItem'),
      new TaskItem("Visit Ann"),
        new TaskItem("Call Dad"),
        new TaskItem("Go to the gym"),
        new TaskItem("Wash the dishes"),
        new TaskItem("Shop for the party")
    ]
    return {taskItems};
  }
}


