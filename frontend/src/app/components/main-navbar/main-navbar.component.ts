import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.sass'
})
export class MainNavbarComponent implements OnInit {
  admin: boolean = false;
  moderador: boolean = false;
  user: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const role = await this.authService.getRole();
    switch (role) {
      case 0:
        this.admin = true;
        this.moderador = true;
        this.user = true;
        break;
      case 1:
        this.admin = false;
        this.moderador = false;
        this.user = true;
        break;
      case 2:
        this.moderador = true;
        this.admin = false;
        this.user = true;
        break;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
