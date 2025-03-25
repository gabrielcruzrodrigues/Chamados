import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sectors-dashboard',
  standalone: true,
  imports: [MainNavbarComponent, TopUserInfosComponent, RouterModule],
  templateUrl: './sectors-dashboard.component.html',
  styleUrl: './sectors-dashboard.component.sass'
})
export class SectorsDashboardComponent {
  title: string = 'Setores';
}
