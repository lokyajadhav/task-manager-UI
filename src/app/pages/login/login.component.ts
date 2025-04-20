import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskManagerService } from '../task-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private loginService: TaskManagerService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Developer']  // default role
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const { email, password, role } = this.loginForm.value;
      console.log("enterd in to login submit")

      this.loginService.login(email, password, role).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('role', role);
          localStorage.setItem('userId',response.id);

          let event = {}
          if (role === "Manager") {
            event = {

              "data": "Manager",
              "loginStatus": true
            }

          }
          else {
            event = {

              "data": "Developer",
              "loginStatus": true
            }
          }
          console.log(event)
          console.log("role: ", role)
          this.loginService.triggerTaskAssigned(event)

          this.loginService.loggedInn();
          this.router.navigate(['/tasks-manager']);
        },
        (error: any) => {
          alert('Login failed');
        }
      );
    }
  }
}
