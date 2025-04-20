import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
 displayedColumns: string[] = ['name','email' ,'designation', 'hasBandwidth', 'tasks'];
  dataSource = new MatTableDataSource<any>();
  constructor(private taskService:TaskManagerService)
  {

  }
  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks()
  {
    this.taskService.fetchAllUsers().subscribe(
      (response: any) => {
      
        this.dataSource.data=response;
       
        
        
      },
      (error: any) => {
        alert(' failed to fetch users');
      }
    );
    
  }
}
