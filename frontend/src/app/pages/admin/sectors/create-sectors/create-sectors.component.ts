import { Component } from '@angular/core';
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { InputErrorMessageComponent } from "../../../../components/input-error-message/input-error-message.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectorService } from '../../../../services/sector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateSector } from '../../../../types/Sector';
import { HttpResponse } from '@angular/common/http';
import { nameValidators } from '../../../../validators/nameValidator';

@Component({
    selector: 'app-create-sectors',
    imports: [
        SpinningComponent,
        MainNavbarComponent,
        TopUserInfosComponent,
        InputErrorMessageComponent,
        ReactiveFormsModule
    ],
    templateUrl: './create-sectors.component.html',
    styleUrl: './create-sectors.component.sass'
})
export class CreateSectorsComponent {
  sectorForm: FormGroup;
  title: string = 'Setores';

  //variable for control spinning
  isLoading: boolean = false;

  nameErrors: string[] = [];

  constructor(
    private sectorService: SectorService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.sectorForm = this.fb.group({
      name: ['', [Validators.required, nameValidators()]]
    })
  }

  submit(): void {
    if (this.sectorForm.invalid) {
      this.getNameErrors();
    } else {
      this.isLoading = true;
      const sector: CreateSector = this.sectorForm.value as CreateSector;

      this.sectorService.create(sector).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.toastr.success(`O setor ${sector.name} foi criado com sucesso!`);
          } else {
            this.toastr.info(`Uma resposta inesperada foi retornada pelo servidor, contate um administrador do sistema!`);
          }
          this.isLoading = false;
          this.router.navigate(['/sectors']);
        },
        error: (error) => {
          if (error.status == 409) {
            this.nameErrors = ['Este nome já foi registrado, tente outro nome!'];
            this.isLoading = false;
          } else {
            this.toastr.error("Houve um erro ao tentar criar um novo setor, procure o administrador do sistema!");
            console.log(error);
            this.isLoading = false;
            this.router.navigate(['/sectors'])
            return;
          }
        }
      })
    }
  }

  clearInputErrors(): void {
    this.nameErrors = [];
  }

  getNameErrors(): void {
    const nameControl = this.sectorForm.get('name');
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
}
