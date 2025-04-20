import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
// import { TasksManangerComponent } from './pages/tasks-mananger/tasks-mananger.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './pages/auth.guard';





  const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // ⬅ Default route
    { path: 'login', component: LoginComponent },
    { path: 'tasks-manager', component: TaskViewComponent, canActivate: [AuthGuard] },
    { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard] }
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
