import { Component, OnInit } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sectors-dashboard',
  standalone: true,
  imports: [
    MainNavbarComponent, 
    TopUserInfosComponent, 
    RouterModule,
    CommonModule
  ],
  templateUrl: './sectors-dashboard.component.html',
  styleUrl: './sectors-dashboard.component.sass'
})
export class SectorsDashboardComponent implements OnInit {
  title: string = 'Setores';
  userRole: number = 1;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userRole = await this.authService.getRole();
  }
}
