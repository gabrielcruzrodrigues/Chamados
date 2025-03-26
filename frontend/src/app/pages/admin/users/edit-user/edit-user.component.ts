import { Component, OnInit } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { nameValidators } from '../../../../validators/nameValidator';
import { passwordValidator } from '../../../../validators/passwordValidator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser, ErrorResponseCreateUser, ResponseCreateUser, UpdateUser, User } from '../../../../types/User';
import { InputErrorMessageComponent } from "../../../../components/input-error-message/input-error-message.component";
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MainNavbarComponent,
    TopUserInfosComponent,
    InputErrorMessageComponent,
    ReactiveFormsModule,
    SpinningComponent
],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.sass'
})
export class EditUserComponent implements OnInit{
  userForm: FormGroup;
  title: string = 'Users';

  //variable for control spinning
  isLoading: boolean = true;

  //variables for change the visibility of the password and passwordVarify inputs
  passwordVisible: boolean = false;

  //variable for validation password
  wrongPassword: boolean = false;

  //arrays with errors 
  nameErrors: string[] = [];
  emailErrros: string[] = [];
  passwordErrros: string[] = [];
  passwordVerifyErrors: string[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, nameValidators()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordValidator()],
      passwordVerify: [''],
      role: [1, Validators.required]
    })
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('userId') ?? '0';
    this.userService.getById(id).pipe(map(response => response.body))
    .subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userForm.patchValue({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          });
          this.isLoading = false;
        }
      },
      error: (error) => {
        if (error.status === 500) {
          this.toastr.error("Houve um erro ao buscar os dados do usuário, contate um administrador do sistema!");
          this.isLoading = false;
          this.router.navigate(['/users']); 
        } 
      }
    })
  }

  Submit(): void {
    if (this.userForm.invalid || !this.verifyPassword()) {
      this.getNameErrors();
      this.getEmailErrors();
      this.getPasswordErrors();
      this.getPasswordVerifyErrors();
    } else {
      this.isLoading = true;
      const user: UpdateUser = this.userForm.value as UpdateUser;

      this.userService.update(user).subscribe({
        next: (response: HttpResponse<any>) => {
          this.toastr.success(`O usuário foi atualizado com sucesso!`);
          this.router.navigate(['/users']);
          this.isLoading = false;
        },
        error: (error: ErrorResponseCreateUser) => {
          console.log(error);
          if (error.error.code == 409) {
            this.isLoading = false;
            if (error.error.type == 'name') {
              this.nameErrors = ['Este nome já foi registrado, tente outro nome!'];
            } else {
              this.emailErrros = ['Este email já foi registrado, tente outro email!'];
            }
          } else {
            this.toastr.error("Houve um erro ao tentar atualizar o usuário, procure o administrador do sistema!");
            console.log(error);
            this.isLoading = false;
            this.router.navigate(['/users'])
            return;
          }
        }
      })
    }
  }

  verifyPassword(): boolean {
    const password = this.userForm.get('password')?.value;
    const verifyPassword = this.userForm.get('passwordVerify')?.value;

    if (password !== verifyPassword) {
      this.wrongPassword = true;
      return false;
    }

    return true;
  }

  clearInputErrors(option: string): void {
    if (option == 'name') {
      this.nameErrors = [];
    }

    if (option == 'email') {
      this.emailErrros = [];
    }

    if (option == 'password') {
      this.passwordErrros = [];
    }

    if (option == 'passwordVerify') {
      this.wrongPassword = false;
      this.passwordVerifyErrors = [];
    }
  }

  getNameErrors(): void {
    const nameControl = this.userForm.get('name');
    const errors: string[] = [];

    if (nameControl?.hasError('required')) {
      errors.push('O nome é obrigatório.');
      this.nameErrors = errors;
      return;
    }

    if (nameControl?.hasError('minLength')) {
      errors.push('O nome deve conter mais de 2 caracteres.');
      this.nameErrors = errors;
      return;
    }

    if (nameControl?.hasError('missingLetter')) {
      errors.push("O nome deve conter pelo menos uma letra.");
      this.nameErrors = errors;
      return;
    }
  }

  getEmailErrors(): void {
    const emailControl = this.userForm.get('email');
    const errors: string[] = [];

    if (emailControl?.hasError('required')) {
      errors.push('O email é obrigatório.');
      this.emailErrros = errors;
      return;
    }

    if (emailControl?.hasError('email')) {
      errors.push('Por favor, insira um email válido. Sem conter espaços antes ou depois!');
      this.emailErrros = errors;
      return;
    }
  }

  getPasswordErrors(): void {
    const passwordControl = this.userForm.get('password');
    const passwordVerifyControl = this.userForm.get('passwordVerify');
    const errors: string[] = [];

    if (passwordControl?.hasError('required')) {
      errors.push('A senha é obrigatório.');
      this.passwordErrros = errors;
      return;
    }

    if (passwordControl?.hasError('passwordTooShort')) {
      errors.push('A senha deve conter pelo menos 8 caracteres.');
      this.passwordErrros = errors;
      return;
    }

    if (passwordControl?.hasError('missingLetter')) {
      errors.push('A senha deve conter pelo menos 1 letra.');
      this.passwordErrros = errors;
      return;
    }

    if (passwordControl?.hasError('missingNumber')) {
      errors.push('A senha deve conter pelo menos 1 número.');
      this.passwordErrros = errors;
      return;
    }
  }

  getPasswordVerifyErrors(): void {
    const passwordVerifyControl = this.userForm.get('passwordVerify');
    const errors: string[] = [];

    if (passwordVerifyControl?.hasError('required')) {
      errors.push('A verificação de senha é obrigatória!');
      this.passwordVerifyErrors = errors;
      return;
    }

    this.verifyPassword();

    if (this.wrongPassword) {
      errors.push('As senhas não são iguais!');
      this.passwordVerifyErrors = errors;
      return;
    }
  }
}
