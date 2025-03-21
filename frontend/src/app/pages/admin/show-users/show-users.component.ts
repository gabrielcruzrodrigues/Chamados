import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainNavbarComponent } from "../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../components/top-user-infos/top-user-infos.component";
import { SpinningComponent } from "../../../components/spinning/spinning.component";
import { UserService } from '../../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../types/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [
    MainNavbarComponent, 
    TopUserInfosComponent, 
    SpinningComponent, 
    CommonModule
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.sass'
})
export class ShowUsersComponent implements OnInit{
  isLoading: boolean = true;
  users: User[] = [];

  orderNameListAZToggle: boolean = false;
  nameButtonOrderListAZ: string = 'Ordenar Nome por A - Z';
  @ViewChild('nameOrderAZ') nameOrderAZ!: ElementRef;

  orderEmailListAZToggle: boolean = false;
  emailButtonOrderListAZ: string = 'Ordenar Email por A - Z';
  @ViewChild('emailOrderAZ') emailOrderAZ!: ElementRef;

  orderRoleListAZToggle: boolean = false;
  @ViewChild('roleOrderAZ') roleOrderAZ!: ElementRef;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response: HttpResponse<User[]>) => {
        this.isLoading = false;

        response.body?.forEach(user => {
          this.users.push(user);
        });
      }, 
      error: (error) => {
        console.log(error);
        this.isLoading = false;

        if (error.status == 500)
        {
          this.toastr.error("Ocorreu um erro ao tentar buscar os usuários, contate um administrador do sistema!");
          this.router.navigate(['/users']);
        }
      }
    })
  }

  orderListAZ(option: string): void {

    switch(option) {
      case "name":
        if (!this.orderNameListAZToggle) {
          this.orderNameListAZToggle = true;
          this.nameButtonOrderListAZ = 'Ordenar Nome por Z - A';
          this.users.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          this.orderNameListAZToggle = false;
          this.nameButtonOrderListAZ = 'Ordenar Nome por A - Z';
          this.users.sort((a, b) => b.name.localeCompare(a.name));
        }
        break;

      case "email":
        if (!this.orderEmailListAZToggle) {
          this.orderEmailListAZToggle = true;
          this.emailButtonOrderListAZ = 'Ordenar Email por Z - A';
          this.users.sort((a, b) => a.email.localeCompare(b.email));
        } else {
          this.orderEmailListAZToggle = false;
          this.emailButtonOrderListAZ = 'Ordenar Email por A - Z';
          this.users.sort((a, b) => b.email.localeCompare(a.email));
        }
        break;
    }

    
  }
}
