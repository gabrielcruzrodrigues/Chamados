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
import { SearchSectorsForEditComponent } from './pages/admin/sectors/search-sectors-for-edit/search-sectors-for-edit.component';
import { SearchSectorsForTrashComponent } from './pages/admin/sectors/search-sectors-for-trash/search-sectors-for-trash.component';
import { EditSectorComponent } from './pages/admin/sectors/edit-sector/edit-sector.component';
import { CreateCallComponent } from './pages/public/calls/create-call/create-call.component';
import { SuccessCallComponent } from './pages/public/calls/success-call/success-call.component';

export const routes: Routes = [
     {
          path: '',
          component: DashboardComponent
     },
     {
          path: 'admin/create-user',
          component: CreateUsersComponent
     },
     {
          path: 'admin/users',
          component: UsersDashboardComponent
     },
     {
          path: 'admin/show-users',
          component: ShowUsersComponent
     },
     {
          path: 'admin/users/show-results/edit',
          component: SearchUsersForEditComponent
     },
     {
          path: 'admin/users/show-results/trash',
          component: SearchUsersForDeleteComponent
     },
     {
          path: 'admin/users/edit/:userId',
          component: EditUserComponent
     },
     {
          path: 'admin/sectors',
          component: SectorsDashboardComponent
     },
     {
          path: 'admin/create-sector',
          component: CreateSectorsComponent
     },
     {
          path: 'admin/show-sectors',
          component: ShowSectorsComponent
     },
     {
          path: 'admin/sectors/show-results/edit',
          component: SearchSectorsForEditComponent
     },
     {
          path: 'admin/sectors/show-results/trash',
          component: SearchSectorsForTrashComponent
     },
     {
          path: 'admin/sectors/edit/:sectorId',
          component: EditSectorComponent
     },

     {
          path: 'call/open',
          component: CreateCallComponent
     },
     {
          path: 'call/success',
          component: SuccessCallComponent
     }
];
