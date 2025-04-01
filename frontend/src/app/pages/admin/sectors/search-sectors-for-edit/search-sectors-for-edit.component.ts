import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { MainSearchSectorsBoxComponent } from "../../../../components/main-search-sectors-box/main-search-sectors-box.component";
import { SectorsTableComponent } from "../../../../components/sectors-table/sectors-table.component";
import { Sector } from '../../../../types/Sector';

@Component({
    selector: 'app-search-sectors-for-edit',
    imports: [MainNavbarComponent, TopUserInfosComponent, MainSearchSectorsBoxComponent, SectorsTableComponent],
    templateUrl: './search-sectors-for-edit.component.html',
    styleUrl: './search-sectors-for-edit.component.sass'
})
export class SearchSectorsForEditComponent {
  title: string = 'Setores';
  titleUsersSearchInput: string = 'Buscar setores para editar';
  sectors: Sector[] = [];
  typeActions: string = 'edit';

  onSearchSector(sector: Sector[]): void {
    this.sectors = sector;
  }
}
