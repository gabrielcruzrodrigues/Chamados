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
  userRole: number = 3;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("user role: " + this.userRole);
    console.log("v.admin: " + this.admin)
    console.log("v.moderador: " + this.moderador)
    console.log("v.user: " + this.user)

    try {
      this.userRole = await this.authService.getRole();

      switch (this.userRole) {
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
          this.admin = false;
          this.moderador = true;
          this.user = true;
          break;
      }
    } catch (error) {
      console.error("Erro ao obter a role do usuário:", error);
    } finally {
      this.isLoading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
