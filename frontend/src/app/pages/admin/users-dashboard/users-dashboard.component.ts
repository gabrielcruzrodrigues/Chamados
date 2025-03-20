import { Component } from '@angular/core';
import { MainNavbarComponent } from '../../../components/main-navbar/main-navbar.component';
import { TopUserInfosComponent } from '../../../components/top-user-infos/top-user-infos.component';
import { MainSearchUserBoxComponent } from "../../../components/main-search-user-box/main-search-user-box.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    MainNavbarComponent, TopUserInfosComponent, MainSearchUserBoxComponent, RouterModule
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.sass'
})
export class UsersDashboardComponent {

}
