import { Component } from '@angular/core';
import { TaskManagerService } from './pages/task-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';
  showLayout = false;
  constructor(private taskService: TaskManagerService){

    if(localStorage.getItem('role')!=undefined)  this.showLayout=true;
    this.taskService.taskAssigned$.subscribe((task) => {
      this.showLayout=task.loginStatus;
    });

  }
}
