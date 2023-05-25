import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../shared/task-item';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  taskItems : TaskItem[] = [];

  newTask : TaskItem = {
    id: '',
    title:'',
    isDone:false,
    showTaskItem: true
  };

  selectedTask : TaskItem = {
    id: '',
    title:'',
    isDone:false,
    showTaskItem: true
  };

  constructor(private taskService : TaskService,
              private activatedRoute : ActivatedRoute,
              private router : Router) {}

  ngOnInit(): void{
      //** datepicker */
      // var date: Date = new Date(this.route.snapshot.params['date']);
      // console.log(date);

      //**load saved Tasks */
      this.taskService.getAllTasks().subscribe((result) => {
        this.taskItems =result;
      });

      this.activatedRoute.paramMap.subscribe({
        next: (params) =>{
          var id = params.get('id');

          if(id){
            this.taskService.getTaskById(id).subscribe({
              next: (response) =>{
                this.selectedTask = response;
              }
            });
          }
        }
      })
    }

    update(){
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(()=>{
        this.ngOnInit();
      this.router.navigate(['todo']);
      });

    }

    add(){
      this.taskService.addTask(this.newTask).subscribe((result) =>{
        console.log(result)
        this.taskItems.push(result);
      });
    }


  delete(id : string){
    this.taskService.deleteTask(id).subscribe();
    this.taskItems = this.taskItems.filter(t => t.id != id);
  }

  toggle(checkedTask : TaskItem){
    this.taskService.toggleTask(checkedTask).subscribe();
    checkedTask.isDone = !checkedTask.isDone;
  }
}

