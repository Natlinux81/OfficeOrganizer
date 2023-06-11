import { Component, OnInit } from '@angular/core';
import { TaskItem } from 'src/app/shared/task-item';
import { TaskService } from 'src/app/service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  taskItems : TaskItem[] = []; // Array to store tasks

  newTask : TaskItem = { // A new task object that can be added
    id: '',
    title:'',
    isDone:false,
    showTaskItem: true
  };

  selectedTask : TaskItem = { // The selected task object that can be updated
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

      // Load all tasks from the TaskService
      this.taskService.getAllTasks().subscribe((result) => {
        this.taskItems =result;
      });

      //**load saved Tasks */
      this.activatedRoute.paramMap.subscribe({
        next: (params) =>{
          var id = params.get('id');

          if(id){
            this.taskService.getTaskById(id).subscribe({
              next: (response) =>{
                this.selectedTask = response; // Set the selected task to the response from the TaskService
              }
            });
          }
        }
      })
    }

    update(){
      // Update the selected task through the TaskService
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(()=>{
        this.ngOnInit(); // Reload the tasks after the update
      this.router.navigate(['todo']); // Navigate to the 'todo' route
      });
    }

    add(){
      // Add a new task through the TaskService
      this.taskService.addTask(this.newTask).subscribe((result) =>{
        console.log(result)
        this.taskItems.push(result); // Add the result to the taskItems array

      });
    }


  delete(id : string){
    // Delete a task through the TaskService using the provided ID
    this.taskService.deleteTask(id).subscribe();
    this.taskItems = this.taskItems.filter(t => t.id != id); // Remove the deleted task from the taskItems array
  }

  toggle(checkedTask : TaskItem){
    // Update the status of a task (done or not) through the TaskService
    // TODO
    this.taskService.toggleTask(checkedTask).subscribe();
    checkedTask.isDone = !checkedTask.isDone;
  }
}

