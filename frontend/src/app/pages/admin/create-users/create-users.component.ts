import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainNavbarComponent } from '../../../components/main-navbar/main-navbar.component';
import { TopUserInfosComponent } from "../../../components/top-user-infos/top-user-infos.component";
import { InputErrorMessageComponent } from "../../../components/input-error-message/input-error-message.component";
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { nameValidators } from '../../../validators/nameValidator';
import { passwordValidator } from '../../../validators/passwordValidator';

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
  passwordErrros: string[] = [];
  passwordVerifyErrors: string[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  )
  {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, nameValidators()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      passwordVerify: ['', Validators.required],
      role: [1, Validators.required]
    })
  }

  Submit(): void {
    if (this.userForm.invalid) {
      this.getNameErrors();
      this.getEmailErrors();
      this.getPasswordErrors();
      this.getPasswordVerifyErrors();
      return;
    }
  }

  verifyPassword(): void {
    const password = this.userForm.get('password')?.value;
    const verifyPassword = this.userForm.get('passwordVerify')?.value;

    if (password !== verifyPassword) {
      this.wrongPassword = true;
    }
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
