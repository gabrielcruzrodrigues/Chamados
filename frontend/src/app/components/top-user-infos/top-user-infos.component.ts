import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-user-infos',
  standalone: true,
  imports: [],
  templateUrl: './top-user-infos.component.html',
  styleUrl: './top-user-infos.component.sass'
})
export class TopUserInfosComponent {
  @Input() title: string = 'informações principais';
}
