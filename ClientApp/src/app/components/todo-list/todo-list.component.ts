import { Component} from '@angular/core';
import { TaskItem } from 'src/app/shared/task-item';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  taskItems : TaskItem[] = []; // Array to store tasks
  taskOwner: string = ""

  newTask : TaskItem = { // A new task object that can be added
    id: '',
    title:'',
    isDone:false,
    owner: '',
    showTaskItem: true
  };

  selectedTask : TaskItem = { // The selected task object that can be updated
    id: '',
    title:'',
    isDone:false,
    owner: '',
    showTaskItem: true
  };

  constructor(private taskService : TaskService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private userStore : UserStoreService,
              private authenticateService : AuthenticateService) {}

  ngOnInit(): void{
      //** datepicker */
      // var date: Date = new Date(this.route.snapshot.params['date']);
      // console.log(date);

      // Load all tasks from the TaskService
      this.taskService.getAllTasks().subscribe((result) => {
        this.taskItems =result.filter(x => x.owner == this.taskOwner)
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
      });
      // Set Owner = Username
      this.userStore.getUsernameFromStore()
      .subscribe(val =>{
        const usernameFromToken = this.authenticateService.getUsernameFromToken();
        this.newTask.owner = val || usernameFromToken
        this.taskOwner = val || usernameFromToken
      })
    }


    update(){
      // Update the selected task through the TaskService
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(()=>{
        this.ngOnInit(); // Reload the tasks after the update
      this.router.navigate(['todo']); // Navigate to the 'todo' route
      console.log(this.selectedTask)
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

