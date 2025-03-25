import { Routes } from '@angular/router';
import { CreateUsersComponent } from './pages/admin/users/create-users/create-users.component';
import { DashboardComponent } from './pages/admin/users/dashboard/dashboard.component';
import { ShowUsersComponent } from './pages/admin/users/show-users/show-users.component';
import { SearchUsersForEditComponent } from './pages/admin/users/search-users-for-edit/search-users-for-edit.component';
import { SearchUsersForDeleteComponent } from './pages/admin/users/search-users-for-delete/search-users-for-delete.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { UsersDashboardComponent } from './pages/admin/users/users-dashboard/users-dashboard.component';
import { SectorsDashboardComponent } from './pages/admin/sectors/sectors-dashboard/sectors-dashboard.component';
import { CreateSectorsComponent } from './pages/admin/sectors/create-sectors/create-sectors.component';
import { ShowSectorsComponent } from './pages/admin/sectors/show-sectors/show-sectors.component';

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
     },
     {
          path: 'sectors',
          component: SectorsDashboardComponent
     },
     {
          path: 'create-sector',
          component: CreateSectorsComponent
     },
     {
          path: 'show-sectors',
          component: ShowSectorsComponent
     }
];
