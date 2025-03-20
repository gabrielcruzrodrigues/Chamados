import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../components/main-navbar/main-navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MainNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
