import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../shared/task-item';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  taskItems : TaskItem[] = [];

  constructor(private taskService : TaskService) {}

  ngOnInit(): void{
      //** datepicker */
      // var date: Date = new Date(this.route.snapshot.params['date']);
      // console.log(date);

      //**load saved Tasks */
      this.taskItems = this.taskService.getAllTasks();
    }

  add(newTask: string){
    this.taskService.addTask(newTask)
  }

  remove(existingTask : TaskItem){
    this.taskService.removeTask(existingTask);
  }
}
