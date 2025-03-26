import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { Sector } from '../../types/Sector';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinningComponent } from "../spinning/spinning.component";

@Component({
  selector: 'app-main-search-sectors-box',
  standalone: true,
  imports: [SpinningComponent],
  templateUrl: './main-search-sectors-box.component.html',
  styleUrl: './main-search-sectors-box.component.sass'
})
export class MainSearchSectorsBoxComponent {
  @Input() title: string = 'Buscar setores';
  @Input() isLoading: boolean = false;
  @Output() searchSector = new EventEmitter<Sector[]>();

  constructor(
    private sectorService: SectorService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  search(event: Event): void {
    event.preventDefault();
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;

    if (inputElement.value) {
      this.isLoading = true;
      this.sectorService.search(inputElement.value).subscribe({
        next: (response: HttpResponse<Sector[]>) => {
          const sectors = response.body ?? [];
          
          if (sectors.length == 0) {
            this.toastr.info("Nenhum setor encontrado!")
          }
          
          this.searchSector.emit(sectors);
          // this.isLoading = false;
        },
        error: (error) => {
          if (error.status == 500) {
            this.isLoading = false;
            this.toastr.error("Ocorreu um erro ao tentar buscar os setores, contate um administrador do sistema!");
            this.router.navigate(['/sectors']);
          }
        }
      })
    }
  }
}
