import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../types/User';
import { ModalConfirmComponent } from "../modal-confirm/modal-confirm.component";
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpinningComponent } from "../spinning/spinning.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent, SpinningComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.sass'
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() typeActions: string = 'default';
  modalDeleteMessage: string = "Tem certeza de que deseja desativar este usuário?";
  userId: number = 0;
  isLoading: boolean = false;

  isModalOpen: boolean = false;

  constructor (
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  openModal(userId: number): void {
    this.isModalOpen = true;
    this.userId = userId;
  }

  onConfirmDelete(confirm: boolean): void {
    this.isLoading = true;
    this.isModalOpen = false;
    if (confirm) {
      this.userService.delete(this.userId).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status == 204) {
            this.toastr.success("Usuário desabilitado com sucesso!");
            this.users = [...this.users.filter(user => user.id !== this.userId)];
          } else {
            this.toastr.info("Uma resposta inesperada foi retornada pelo sistema, contate um administrador do sistema!");
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error("Houve um erro ao tentar desabilitar um usuário, contate um administrador do sistema!");
        }
      })
    }
  }

  goToEditPage(userId: number): void {
    this.router.navigate([`/admin/users/edit/${userId}`]);
  }
}
