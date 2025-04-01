import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavbarComponent } from '../../../../components/main-navbar/main-navbar.component';
import { TopUserInfosComponent } from '../../../../components/top-user-infos/top-user-infos.component';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users-dashboard',
    imports: [
        MainNavbarComponent,
        TopUserInfosComponent,
        RouterModule,
        CommonModule
    ],
    templateUrl: './users-dashboard.component.html',
    styleUrl: './users-dashboard.component.sass'
})
export class UsersDashboardComponent implements OnInit {
  title: string = 'Usuários';
  userRole: number = 1;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.userRole = await this.authService.getRole();
  }
}
