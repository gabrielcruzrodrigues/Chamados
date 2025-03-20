import { Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/admin/create-users/create-users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersDashboardComponent } from './pages/admin/users-dashboard/users-dashboard.component';

export const routes: Routes = [
     {
          path: '',
          component: DashboardComponent
     },
     {
          path: 'create-user',
          component: CreateUsersComponent
     },
     {
          path: 'users',
          component: UsersDashboardComponent
     }
];
