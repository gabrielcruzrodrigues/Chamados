import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectorService } from '../../../../services/sector.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nameValidators } from '../../../../validators/nameValidator';
import { CreateSector, Sector, UpdateSector } from '../../../../types/Sector';
import { HttpResponse } from '@angular/common/http';
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { InputErrorMessageComponent } from "../../../../components/input-error-message/input-error-message.component";
import { map } from 'rxjs';

@Component({
    selector: 'app-edit-sector',
    imports: [
        SpinningComponent,
        MainNavbarComponent,
        TopUserInfosComponent,
        InputErrorMessageComponent,
        ReactiveFormsModule
    ],
    templateUrl: './edit-sector.component.html',
    styleUrl: './edit-sector.component.sass'
})
export class EditSectorComponent {
  sectorForm: FormGroup;
  title: string = 'Setores';

  //variable for control spinning
  isLoading: boolean = false;

  nameErrors: string[] = [];

  constructor(
    private sectorService: SectorService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sectorForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, nameValidators()]]
    })
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('sectorId') ?? '0';
        this.sectorService.getById(id).pipe(map(response => response.body))
        .subscribe({
          next: (sector: Sector | null) => {
            if (sector) {
              this.sectorForm.patchValue({
                id: sector.id,
                name: sector.name
              });
              this.isLoading = false;
            }
          },
          error: (error) => {
            if (error.status === 500) {
              this.toastr.error("Houve um erro ao buscar os dados do setor, contate um administrador do sistema!");
              this.isLoading = false;
              this.router.navigate(['/sectors']); 
            } 
          }
        })
  }

  submit(): void {
    if (this.sectorForm.invalid) {
      this.getNameErrors();
    } else {
      this.isLoading = true;
      const sector: UpdateSector = this.sectorForm.value as UpdateSector;

      this.sectorService.update(sector).subscribe({
        next: (response: HttpResponse<any>) => {
          this.toastr.success(`O setor foi atualizado com sucesso!`);
          this.isLoading = false;
          this.router.navigate(['/sectors']);
        },
        error: (error) => {
          if (error.status == 409) {
            this.nameErrors = ['Este nome já foi registrado, tente outro nome!'];
            this.isLoading = false;
          } else {
            this.toastr.error("Houve um erro ao tentar atualizar o setor, procure o administrador do sistema!");
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
