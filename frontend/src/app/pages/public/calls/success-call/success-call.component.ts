import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";

@Component({
  selector: 'app-success-call',
  standalone: true,
  imports: [MainNavbarComponent, TopUserInfosComponent],
  templateUrl: './success-call.component.html',
  styleUrl: './success-call.component.sass'
})
export class SuccessCallComponent {
  title: string = 'Chamados';
}
