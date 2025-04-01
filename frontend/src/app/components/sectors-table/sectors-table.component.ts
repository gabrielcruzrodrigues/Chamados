import { Component, Input } from '@angular/core';
import { Sector } from '../../types/Sector';
import { SectorService } from '../../services/sector.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from "../modal-confirm/modal-confirm.component";
import { SpinningComponent } from "../spinning/spinning.component";
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-sectors-table',
    imports: [
        CommonModule,
        ModalConfirmComponent,
        SpinningComponent
    ],
    templateUrl: './sectors-table.component.html',
    styleUrl: './sectors-table.component.sass'
})
export class SectorsTableComponent {
  @Input() sectors: Sector[] = [];
  @Input() typeActions: string = 'default';
  modalDeleteMessage: string = "Tem certeza de que deseja desativar este setor?";
  sectorId: number = 0;
  isLoading: boolean = false;

  isModalOpen: boolean = false;

  constructor (
    private sectorService: SectorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  openModal(userId: number): void {
    this.isModalOpen = true;
    this.sectorId = userId;
  }

  onConfirmDelete(confirm: boolean): void {
    this.isLoading = true;
    this.isModalOpen = false;
    if (confirm) {
      this.sectorService.delete(this.sectorId).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status == 204) {
            this.toastr.success("Setor desabilitado com sucesso!");
            this.sectors = [...this.sectors.filter(sector => sector.id !== this.sectorId)];
          } else {
            this.toastr.info("Uma resposta inesperada foi retornada pelo sistema, contate um administrador do sistema!");
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error("Houve um erro ao tentar desabilitar um setor, contate um administrador do sistema!");
        }
      })
    }
  }

  goToEditPage(sectorId: number): void {
    this.router.navigate([`/admin/sectors/edit/${sectorId}`]);
  }
}
