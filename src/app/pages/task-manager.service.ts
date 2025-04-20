import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private loggedIn = false;
  private apiUrl = 'http://localhost:8003';

  private taskAssignedSource = new Subject<any>();

  
  taskAssigned$ = this.taskAssignedSource.asObservable();

 

  
  triggerTaskAssigned(task: any) {
    this.taskAssignedSource.next(task);
  }

  constructor(private http: HttpClient,private router:Router) {}


  loggedInn(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
    const event={
          
      "data":"Null",
      "loginStatus":false
    }
    localStorage.clear();
   this.triggerTaskAssigned(event)
   this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('role')!=undefined) return true; else return false;
  }

  login(email: string, password: string, role: string): Observable<any> {
    const payload = {
      "email":email,
      "password":password,
      "designation":role
    }

    return this.http.post(`${this.apiUrl}/login`, payload);
  }
  createTask(payload:any): Observable<any> {
   

    return this.http.post(`${this.apiUrl}/create-task`, payload);
  }
  fetchAvailableDevelopers(): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/get-developers-with-bandwidth`);
  }
  fetchAllTasks(): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/get-all-tasks`);
  }
  fetchAllUsers(): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/get-all-users`);
  }
  fetchDeveloperTasks(userId:any): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/get-develper-tasks/${userId}`);
  }
  updateTask(taskId:any,status:any): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/update-task/${taskId}/${status}`);
  }
  assignTask(taskId:any, userId:any): Observable<any> {
   

    return this.http.get(`${this.apiUrl}/assign-task/${taskId}/${userId}`);
  }
}
