import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { UsersTableComponent } from "../../../../components/users-table/users-table.component";
import { Sector } from '../../../../types/Sector';
import { SectorService } from '../../../../services/sector.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SectorsTableComponent } from "../../../../components/sectors-table/sectors-table.component";

@Component({
    selector: 'app-show-sectors',
    imports: [
        MainNavbarComponent,
        SpinningComponent,
        TopUserInfosComponent,
        SectorsTableComponent
    ],
    templateUrl: './show-sectors.component.html',
    styleUrl: './show-sectors.component.sass'
})
export class ShowSectorsComponent {
  isLoading: boolean = true;
  sectors: Sector[] = [];
  title: string = 'Setores';

  orderNameListAZToggle: boolean = false;
  nameButtonOrderListAZ: string = 'Ordenar Nome por A - Z';
  @ViewChild('nameOrderAZ') nameOrderAZ!: ElementRef;

  constructor(
    private userService: SectorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response: HttpResponse<Sector[]>) => {
        response.body?.forEach(user => {
          this.sectors.push(user);
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;

        if (error.status == 500) {
          this.toastr.error("Ocorreu um erro ao tentar buscar os setores, contate um administrador do sistema!");
          this.router.navigate(['/sectors']);
        }
      }
    })
  }

  orderListAZ(option: string): void {
    if (!this.orderNameListAZToggle) {
      this.orderNameListAZToggle = true;
      this.nameButtonOrderListAZ = 'Ordenar Nome por Z - A';
      this.sectors.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.orderNameListAZToggle = false;
      this.nameButtonOrderListAZ = 'Ordenar Nome por A - Z';
      this.sectors.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
}
