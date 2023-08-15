import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[AuthenticationGuard], data:{
      roles:['Admin'],
    }
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate:[AuthenticationGuard], data:{roles:['User']}
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'forbidden', component: ForbiddenAccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
