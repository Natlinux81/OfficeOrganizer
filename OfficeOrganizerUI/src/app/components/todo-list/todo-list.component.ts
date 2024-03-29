import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TaskItem } from 'src/app/models/task-item';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taskItems: TaskItem[] = []; // Array to store tasks
  taskOwner: string = ""

  newTask: TaskItem = { // A new task object that can be added
    id: '',
    title: '',
    isDone: false,
    owner: '',
    isEditMode: false
  };

  selectedTask: TaskItem = { // The selected task object that can be updated
    id: '',
    title: '',
    isDone: false,
    owner: '',
    isEditMode: false
  };

  @ViewChild('FormAdd', { static: false }) formAdd!: NgForm;

  constructor(private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userStore: UserStoreService,
    private authenticateService: AuthenticateService) {

    this.getAllTasks() // Load all tasks from the TaskService   

    //**load saved Tasks */
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        var id = params.get('id');

        if (id) {
          this.taskService.getTaskById(id).subscribe({
            next: (response) => {
              this.selectedTask = response; // Set the selected task to the response from the TaskService
            }
          });
        }
      }
    });

    // Set Owner = Username
    this.userStore.getUsernameFromStore()
      .subscribe(val => {
        const usernameFromToken = this.authenticateService.getUsernameFromToken();
        this.newTask.owner = val || usernameFromToken
        this.taskOwner = val || usernameFromToken
      })
    
  }

  ngOnInit(): void {
    //** datepicker */
    // var date: Date = new Date(this.route.snapshot.params['date']);
    // console.log(date); 
    
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((result) => {
      this.taskItems = result.filter(x => x.owner == this.taskOwner)
    });
  }

  update() {
    // Update the selected task through the TaskService
    this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
      this.router.navigate(['todo']); // Navigate to the 'todo' route
      console.log(this.selectedTask)
    });
  }

  add() {
    // Add a new task through the TaskService
    this.taskService.addTask(this.newTask).subscribe((result) => {
      console.log(result)
      this.taskItems.push(result); // Add the result to the taskItems array
      this.formAdd.reset();
    });
  }

  delete(id: string) {
    const taskItemName = this.taskItems.find(t => t.id === id)
    if(confirm(`Are you sure you want to delete ${taskItemName?.title}?`))
    // Delete a task through the TaskService using the provided ID
    this.taskService.deleteTask(id).subscribe();
    this.taskItems = this.taskItems.filter(t => t.id != id); // Remove the deleted task from the taskItems array
  }

  toggleIsDone(checkedTask: TaskItem) {
    // Update the status of a task (done or not) through the TaskService
    checkedTask.isDone = !checkedTask.isDone;
    this.taskService.updateTask(checkedTask.id, checkedTask).subscribe(() => {
    });
    console.log(checkedTask)
  }

  toggleEditMode(taskItem: TaskItem) {    
    this.taskItems.forEach(item => item.isEditMode = false);
    taskItem.isEditMode = !taskItem.isEditMode;
  }
}

