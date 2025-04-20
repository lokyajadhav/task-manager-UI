import { Component } from '@angular/core';
import { TaskManagerService } from 'src/app/pages/task-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  myDate = new Date();
constructor(private taskService:TaskManagerService)
{

}
  currentTime: string | undefined;
role:any;
  ngOnInit() {
    this.role = localStorage.getItem('role');
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);}

    logout()
    {
      this.taskService.logout();
    }
}
