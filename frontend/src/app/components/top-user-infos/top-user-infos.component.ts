import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-user-infos',
  standalone: true,
  imports: [],
  templateUrl: './top-user-infos.component.html',
  styleUrl: './top-user-infos.component.sass'
})
export class TopUserInfosComponent implements OnInit {
  @Input() title: string = 'informações principais';
  name: string = 'usuário';

  constructor (
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.name = await this.authService.getName();
  }
}
