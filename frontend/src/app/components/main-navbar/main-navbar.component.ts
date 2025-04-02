import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
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
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    try {
      const userRole = this.authService.getRole();

      switch (userRole) {
        case 0:
          this.admin = true;
          break;
        case 1:
          this.user = true;
          break;
        case 2:
          this.moderador = true;
          break;
      }
      this.isLoading = false;
    } catch (error) {
      console.error("Erro ao obter a role do usuário:", error);
      this.isLoading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
