import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavbarComponent } from '../../../../components/main-navbar/main-navbar.component';
import { TopUserInfosComponent } from '../../../../components/top-user-infos/top-user-infos.component';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    MainNavbarComponent, TopUserInfosComponent, RouterModule
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.sass'
})
export class UsersDashboardComponent {
  title: string = 'Users';
}
