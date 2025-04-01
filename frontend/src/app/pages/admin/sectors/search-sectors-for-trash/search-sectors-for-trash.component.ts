import { Component } from '@angular/core';
import { Sector } from '../../../../types/Sector';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { MainSearchSectorsBoxComponent } from "../../../../components/main-search-sectors-box/main-search-sectors-box.component";
import { SectorsTableComponent } from "../../../../components/sectors-table/sectors-table.component";

@Component({
    selector: 'app-search-sectors-for-trash',
    imports: [MainNavbarComponent, TopUserInfosComponent, MainSearchSectorsBoxComponent, SectorsTableComponent],
    templateUrl: './search-sectors-for-trash.component.html',
    styleUrl: './search-sectors-for-trash.component.sass'
})
export class SearchSectorsForTrashComponent {
  title: string = 'Setores';
  titleUsersSearchInput: string = 'Buscar setores para desativar';
  sectors: Sector[] = [];
  typeActions: string = 'trash';

  onSearchSector(sector: Sector[]): void {
    this.sectors = sector;
  }
}
