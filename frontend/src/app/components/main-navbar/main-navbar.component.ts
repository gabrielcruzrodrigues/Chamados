import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.sass'
})
export class MainNavbarComponent implements OnInit {
  admin: boolean = false;
  moderador: boolean = false;
  user: boolean = true;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const role = await this.authService.getRole();
    switch(role) {
      case 0: 
        this.admin = true;
        this.moderador = true;
        break;
      case 2:
        this.moderador = true;
        break;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
