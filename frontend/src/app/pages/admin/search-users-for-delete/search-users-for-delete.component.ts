import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../components/top-user-infos/top-user-infos.component";
import { MainSearchUserBoxComponent } from "../../../components/main-search-user-box/main-search-user-box.component";
import { UsersTableComponent } from "../../../components/users-table/users-table.component";
import { User } from '../../../types/User';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from "../../../components/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-search-users-for-delete',
  standalone: true,
  imports: [
    MainNavbarComponent,
    TopUserInfosComponent,
    MainSearchUserBoxComponent,
    UsersTableComponent,
    CommonModule
  ],
  templateUrl: './search-users-for-delete.component.html',
  styleUrl: './search-users-for-delete.component.sass'
})
export class SearchUsersForDeleteComponent {
  titleUsersSearchInput: string = 'Buscar usuários para desativar';
  users: User[] = [];
  typeActions: string = 'trash';

  onSearchUser(users: User[]): void {
    this.users = users;
  }
}
