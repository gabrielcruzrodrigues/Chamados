import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../../types/Auth';
import { SpinningComponent } from "../../../components/spinning/spinning.component";

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SpinningComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible: boolean = false;
  submitClick: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    const login: LoginRequest = this.loginForm.value as LoginRequest;
    console.log(login);
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(login).subscribe({
        next: (response: HttpResponse<any>) => {
          this.authService.saveCookiesLogin(response.body);
          this.isLoading = false;
          this.router.navigate(['/call/open']);
        },
        error: (err) => {
          if (err.status === 404) {
            this.toastr.info("Usuário não encontrado!");
          }

          if (err.status === 400) {
            this.toastr.info("Credenciais incorretas");
          }
          this.isLoading = false;
          console.log("Aconteceu um erro ao tentar fazer o login");
        }
      })
    } else {
      this.toastr.error("Credenciais inválidas, preencha corretamente os campos!")
    }
  }
}
