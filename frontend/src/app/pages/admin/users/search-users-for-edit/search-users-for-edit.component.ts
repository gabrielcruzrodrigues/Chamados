import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { MainSearchUserBoxComponent } from "../../../../components/main-search-user-box/main-search-user-box.component";
import { UsersTableComponent } from "../../../../components/users-table/users-table.component";
import { User } from '../../../../types/User';

@Component({
    selector: 'app-search-users-for-edit',
    imports: [MainNavbarComponent, TopUserInfosComponent, MainSearchUserBoxComponent, UsersTableComponent],
    templateUrl: './search-users-for-edit.component.html',
    styleUrl: './search-users-for-edit.component.sass'
})
export class SearchUsersForEditComponent {
  titleUsersSearchInput: string = 'Buscar usuários para a edição';
  users: User[] = [];
  typeActions: string = 'edit';
  title: string = 'Users';

  onSearchUser(users: User[]): void {
    this.users = users;
  }
}
