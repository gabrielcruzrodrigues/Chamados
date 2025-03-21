import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../types/User';
import { ModalConfirmComponent } from "../modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.sass'
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() typeActions: string = 'default';
  modalDeleteMessage: string = "Tem certeza de que deseja desativar este usuário?";


  isModalOpen: boolean = true;

  openModal(): void {
    this.isModalOpen = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.isModalOpen = false;
  }
}
