import { Injectable } from '@angular/core';
import { TaskItem } from '../models/task-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }

  baseUrl = environment.baseUrl

  getAllTasks() : Observable <TaskItem[]> {
    var response = this.httpClient.get<TaskItem[]>(this.baseUrl + 'TaskItem');
    return response;
  }

  addTask(newTask : TaskItem) : Observable <TaskItem>{
    newTask.id = "00000000-0000-0000-0000-000000000000";
    var response = this.httpClient.post<TaskItem>(this.baseUrl + 'TaskItem',newTask);
    return response;
  }

  getTaskById(id : string) : Observable <TaskItem>{
    var response = this.httpClient.get<TaskItem>(this.baseUrl + 'TaskItem/' + id);
    return response;
  }

  updateTask(id : string, updateTask : TaskItem) : Observable <TaskItem>{
    var response = this.httpClient.put<TaskItem>(this.baseUrl + 'TaskItem/' + id, updateTask);
    return response;
  }

  deleteTask(id: string) : Observable<TaskItem> {
    var response = this.httpClient.delete<TaskItem>(this.baseUrl + "TaskItem/" + id)
    return response;
  }
}
