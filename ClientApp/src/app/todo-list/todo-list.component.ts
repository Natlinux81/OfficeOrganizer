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
      this.taskService.getAllTasks().subscribe((result) => {
        this.taskItems =result;
      });
    }

  add(newTask: string){
    this.taskService.addTask(newTask).subscribe();
  }

  remove(existingTask : TaskItem){
    this.taskService.removeTask(existingTask).subscribe();
    this.taskItems = this.taskItems.filter(t => t != existingTask);
    console.log("delete",existingTask)
  }

  toggle(checkedTask : TaskItem){
    this.taskService.toggleTask(checkedTask).subscribe();
    checkedTask.isDone = !checkedTask.isDone;
    console.log("completed",checkedTask)
  }
}

