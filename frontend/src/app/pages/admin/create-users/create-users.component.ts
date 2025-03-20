import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainNavbarComponent } from '../../../components/main-navbar/main-navbar.component';
import { TopUserInfosComponent } from "../../../components/top-user-infos/top-user-infos.component";
import { InputErrorMessageComponent } from "../../../components/input-error-message/input-error-message.component";
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [
    MainNavbarComponent, 
    TopUserInfosComponent, 
    InputErrorMessageComponent, 
    ReactiveFormsModule
  ],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.sass'
})
export class CreateUsersComponent {
  teste: string[] = ['uma mensagem de erro'];
  userForm: FormGroup;

  //variables for change the visibility of the password and passwordVarify inputs
  passwordVisible: boolean = false;

  //variable for validation password
  wrongPassword: boolean = false;

  //arrays with errors 
  nameErrors: string[] = [];
  emailErrros: string[] = [];
  phoneErrors: string[] = [];
  passwordErrros: string[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  )
  {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required],
      role: [1, Validators.required]
    })
  }

  Submit(): void {
    if (this.userForm.invalid) {
      this.getNameErrors();
      this.getEmailErrors();
      this.getPhoneErrors();
      this.getPasswordErrors();
    }
  }

  verifyPassword(): void {
    const password = this.userForm.get('password')?.value;
    const verifyPassword = this.userForm.get('passwordVerify')?.value;

    if (password !== verifyPassword) {
      this.wrongPassword = true;
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getNameErrors(): void {
    const nameControl = this.userForm.get('name');
    const errors: string[] = [];

    if (nameControl?.hasError('required')) {
      errors.push('O nome é obrigatório.');
    }

    if (nameControl?.hasError('minLength')) {
      errors.push('O nome deve conter mais de 2 caracteres.');
    }

    if (nameControl?.hasError('missingLetter')) {
      errors.push("O nome deve conter pelo menos uma letra.");
    }

    this.nameErrors = errors;
  }

  getEmailErrors(): void {
    const emailControl = this.userForm.get('email');
    const errors: string[] = [];

    if (emailControl?.hasError('required')) {
      errors.push('O email é obrigatório.');
    }

    if (emailControl?.hasError('email')) {
      errors.push('Por favor, insira um email válido. Sem conter espaços antes ou depois!');
    }

    this.emailErrros = errors;
  }

  getPhoneErrors(): void {
    const phoneControl = this.userForm.get('phone');
    const errors: string[] = [];

    if (phoneControl?.hasError('required')) {
      errors.push('O telefone é obrigatório.');
    }

    if (phoneControl?.hasError('invalidPhoneNumber')) {
      errors.push('O telefone inserido é inválido.');
    }

    this.phoneErrors = errors;
  }

  getPasswordErrors(): void {
    const passwordControl = this.userForm.get('password');
    const errors: string[] = [];

    if (passwordControl?.hasError('required')) {
      errors.push('A senha é obrigatório.');
    }

    if (passwordControl?.hasError('passwordTooShort')) {
      errors.push('A senha deve conter pelo menos 8 caracteres.');
    }

    if (passwordControl?.hasError('missingLetter')) {
      errors.push('A senha deve conter pelo menos 1 letra.');
    }

    if (passwordControl?.hasError('missingNumber')) {
      errors.push('A senha deve conter pelo menos 1 número.');
    }

    this.passwordErrros = errors;
  }
}
