import { Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/admin/create-users/create-users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersDashboardComponent } from './pages/admin/users-dashboard/users-dashboard.component';
import { ShowUsersComponent } from './pages/admin/show-users/show-users.component';
import { SearchUsersForEditComponent } from './pages/admin/search-users-for-edit/search-users-for-edit.component';
import { SearchUsersForDeleteComponent } from './pages/admin/search-users-for-delete/search-users-for-delete.component';
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';

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
     },
     {
          path: 'users/show-results/edit',
          component: SearchUsersForEditComponent
     },
     {
          path: 'users/show-results/trash',
          component: SearchUsersForDeleteComponent
     },
     {
          path: 'users/edit/:userId',
          component: EditUserComponent
     }
];
