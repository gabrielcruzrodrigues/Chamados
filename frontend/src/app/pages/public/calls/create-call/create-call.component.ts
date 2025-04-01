import { Component, OnInit } from '@angular/core';
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { InputErrorMessageComponent } from "../../../../components/input-error-message/input-error-message.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CallService } from '../../../../services/call.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nameValidators } from '../../../../validators/nameValidator';
import { Sector } from '../../../../types/Sector';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { SectorService } from './../../../../services/sector.service';
import { CreateCall } from '../../../../types/Call';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-create-call',
    imports: [
        SpinningComponent,
        MainNavbarComponent,
        TopUserInfosComponent,
        InputErrorMessageComponent,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './create-call.component.html',
    styleUrl: './create-call.component.sass'
})
export class CreateCallComponent implements OnInit {
  title: string = 'Chamados';
  callForm: FormGroup;
  sectors: Sector[] = [];

  //variable for control spinning
  isLoading: boolean = true;

  titleErrors: string[] = [];
  sectorErrors: string[] = [];
  contentErrors: string[] = [];

  constructor(
    private callService: CallService,
    private sectorService: SectorService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.callForm = this.fb.group({
      title: ['', [Validators.required, nameValidators()]],
      content: ['', Validators.required],
      userId: ['', Validators.required],
      sectorId: ['', Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    var userId = await this.authService.getId();
    this.callForm.patchValue({
      userId: userId
    })

    this.sectorService.getAll().subscribe({
      next: (response: HttpResponse<Sector[]>) => {
        if (response.body) {
          this.sectors = response.body;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 500) {
          this.toastr.error("Houve um erro ao buscar os setores, contate um administrador do sistema!");
        }
      }
    })
  }

  submit(): void {
    if (this.callForm.invalid) {
      this.getTitleErrors();
      this.getSectorErrors();
      this.getContentErrors();
    } else {
      this.isLoading = true;
      const call: CreateCall = this.callForm.value as CreateCall;
      call.sectorId = Number(call.sectorId);

      this.callService.create(call).subscribe({
        next: (response: HttpResponse<any>) => {
          this.router.navigate(['/call/success']);
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 500) {
            this.toastr.error("Houve um erro ao tentar abrir o chamado, procure o administrador do sistema!");
            this.isLoading = false;
            return;
          }
        }
      })
    }
  }

  clearInputErrors(option: string): void {
    if (option == 'title') {
      this.titleErrors = [];
    }

    if (option == 'sector') {
      this.sectorErrors = [];
    }

    if (option == 'content') {
      this.contentErrors = [];
    }
  }

  getTitleErrors(): void {
    const titleControl = this.callForm.get('title');
    const errors: string[] = [];

    if (titleControl?.hasError('required')) {
      errors.push('O título é obrigatório!');
      this.titleErrors = errors;
      return;
    }

    if (titleControl?.hasError('minLength')) {
      errors.push('O título deve conter mais de 2 caracteres!');
      this.titleErrors = errors;
      return;
    }

    if (titleControl?.hasError('missingLetter')) {
      errors.push("O título deve conter pelo menos uma letra!");
      this.titleErrors = errors;
      return;
    }
  }

  getSectorErrors(): void {
    const sectorControl = this.callForm.get('sectorId');
    const errors: string[] = [];
    
    if (sectorControl?.hasError('required')) {
      errors.push('Escolha um setor para continuar!');
      this.sectorErrors = errors;
      return;
    }
  }

  getContentErrors(): void {
    const contentControl = this.callForm.get('content');
    const errors: string[] = [];
    
    if (contentControl?.hasError('required')) {
      errors.push('A descriçao é obrigatória!');
      this.contentErrors = errors;
      return;
    }
  }

}
