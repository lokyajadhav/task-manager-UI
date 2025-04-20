import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component';
import { TaskManagerService } from '../task-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  assignForm!: FormGroup;
  displayedColumns: string[] = ['title', 'description', 'assignedTo', 'status','action'];
  dataSource = new MatTableDataSource<any>();
  displayedColumns1: string[] = ['title', 'description', 'status','action'];
  dataSource1 = new MatTableDataSource<any>();
  statusOptions: string[] = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];
  selectedStatus:any
  availableDevelopers:any=[];
  Tasks:any = [
   
  ];
  userData:any;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private taskService:TaskManagerService)
  {
this.userData={
userId:localStorage.getItem('userId'),
role:localStorage.getItem('role')
}
console.log(this.userData);
  }
  ngOnInit(): void {
    this.fetchTasks();
    this.fetchDevTasks();
    this. fetchAvailableDevelopers();

    this.assignForm = this.fb.group({
      taskId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }
  onAssignTask()
  {
    const { taskId, userId } = this.assignForm.value;
    this.taskService.assignTask(taskId,userId).subscribe(
      (response: any) => {
       
     alert("task has been assigned")
     this.fetchAvailableDevelopers();
     this.fetchTasks();
        
        
      },
      (error: any) => {
        alert(' failed to assign task to developer');
      }
    );
  }
  fetchAvailableDevelopers()
  {
    this.taskService.fetchAvailableDevelopers().subscribe(
      (response: any) => {
       
     this.availableDevelopers=response;
       console.log(this.availableDevelopers)
        
        
      },
      (error: any) => {
        alert(' failed to available developers');
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      width: '565px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTasks();
       this. fetchAvailableDevelopers();
      }
    });
  }
  fetchTasks()
  {
    this.taskService.fetchAllTasks().subscribe(
      (response: any) => {
       console.log("alltask", response)
        this.dataSource.data=response;
        this.Tasks = response.filter((task: any) => task.status === 'CREATED');
        
        
      },
      (error: any) => {
        alert(' failed to fetch tasks');
      }
    );
    this.dataSource.data=this.Tasks
  }

  fetchDevTasks()
  {
    this.taskService.fetchDeveloperTasks(this.userData.userId).subscribe(
      (response: any) => {
       
        console.log(response)
        this.dataSource1.data=response;
       
        
        
      },
      (error: any) => {
        alert(' failed to fetch tasks ');
      }
    );
  
  }


  updateStatus(task:any, status:any): void {

    this.taskService.updateTask(task,status).subscribe(
      (response: any) => {
       
       
       
        alert("task status changed");
        this.fetchAvailableDevelopers();
        this.fetchTasks();
        
      },
      (error: any) => {
        alert(' failed to update the task ');
      }
    );
  }
}
