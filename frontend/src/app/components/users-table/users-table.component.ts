import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../types/User';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.sass'
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() typeActions: string = 'default';
}
