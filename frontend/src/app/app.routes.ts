import { Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/admin/create-users/create-users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersDashboardComponent } from './pages/admin/users-dashboard/users-dashboard.component';
import { ShowUsersComponent } from './pages/admin/show-users/show-users.component';

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
     },
     {
          path: 'show-users',
          component: ShowUsersComponent
     }
];
