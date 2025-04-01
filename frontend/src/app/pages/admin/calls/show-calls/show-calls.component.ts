import { Component, OnInit } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { CallsTableComponent } from "../../../../components/calls-table/calls-table.component";
import { CallService } from '../../../../services/call.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallTable } from '../../../../types/Call';
import { HttpResponse } from '@angular/common/http';
import { formatDate } from '../../../../utils/FormatData';
import { SpinningComponent } from "../../../../components/spinning/spinning.component";

@Component({
    selector: 'app-show-calls',
    imports: [MainNavbarComponent, TopUserInfosComponent, CallsTableComponent, SpinningComponent],
    templateUrl: './show-calls.component.html',
    styleUrl: './show-calls.component.sass'
})
export class ShowCallsComponent implements OnInit {
  title: string = 'Chamados';
  calls: CallTable[] = [];
  isLoading: boolean = true;

  constructor(
    private callService: CallService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.callService.getAll().subscribe({
      next: (response: HttpResponse<CallTable[]>) => {
        this.calls = (response.body ?? []).map(call => {
          return call; 
        });
        
        // Ordenando por ordem decrescente de criação
        this.calls.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime(); 
          const dateB = new Date(b.createdAt).getTime();
          
         
          if (isNaN(dateA) || isNaN(dateB)) {
            console.error('Data inválida encontrada:', a.createdAt, b.createdAt);
            return 0; 
          }
          
          return dateB - dateA; 
        });

        this.calls.forEach(call => {
          call.createdAt = formatDate(call.createdAt); 
        })
        
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 500) {
          this.toastr.error("Houve um erro ao tentar buscar seus chamados, procure um administrador do sistema!");
          this.isLoading = false;
          this.router.navigate(['/call/open']);
        }
        this.isLoading = false;
      }

    })
  }
}
