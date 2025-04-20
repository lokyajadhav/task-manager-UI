import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.css']
})
export class TaskCreateDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
   
    private fb: FormBuilder, private taskService: TaskManagerService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  onSubmit() {
    if (this.taskForm.valid) {

      const taskData = this.taskForm.value;
     
     

      this.taskService.createTask(taskData).subscribe(
        (response: any) => {
         

         alert('task created')
          this.dialogRef.close(taskData);
          
          
        },
        (error: any) => {
          alert('task creation failed');
        }
      );
    }
  }
}
