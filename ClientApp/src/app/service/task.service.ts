import { Injectable } from '@angular/core';
import { TaskItem } from '../shared/task-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }

  tasksUrl: string = "/api/taskItems"

  getAllTasks() : Observable <TaskItem[]> {
    var response = this.httpClient.get<TaskItem[]>(this.tasksUrl);
    return response;
  }

  addTask(newTask : string) : Observable <TaskItem>{
    var response = this.httpClient.post<TaskItem>(this.tasksUrl, newTask);
    console.log("addTask response",newTask)
    return response;
  }

  removeTask(existingTask : TaskItem) : Observable<TaskItem> {
    var response = this.httpClient.delete<TaskItem>(this.tasksUrl + "/" + existingTask)
    console.log("remove" ,TaskItem)
    return response;
  }
}
