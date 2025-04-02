import { CommonModule } from '@angular/common';
import { afterNextRender, Component, NgZone, OnInit } from '@angular/core';
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
    private authService: AuthService,
    private zone: NgZone
  ) {
    afterNextRender(() => {
      const userRole = this.authService.getRole();

      try {
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
      } catch (error) {
        console.error("Erro ao obter a role do usuário:", error);
      }
    })
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
  }
}
