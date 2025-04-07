import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { HistoryCallTable, MyCallTable } from '../../../../types/Call';
import { CallService } from '../../../../services/call.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '../../../../utils/FormatData';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { HistoryCallsTableComponent } from "../../../../components/history-calls-table/history-calls-table.component";
import { PaginationComponent } from "../../../../components/pagination/pagination.component";

@Component({
  selector: 'app-history',
  imports: [MainNavbarComponent, TopUserInfosComponent, SpinningComponent, HistoryCallsTableComponent, PaginationComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.sass'
})
export class HistoryComponent {
  title: string = 'Histórico';
  calls: MyCallTable[] = [];
  isLoading: boolean = true;
  page: number = 1;
  size: number = 10;
  totalCountPages: number = 0;

  constructor
    (
      private callService: CallService,
      private router: Router,
      private toastr: ToastrService,
      private authService: AuthService
    ) { }

  async ngOnInit(): Promise<void> {
    this.fetchCalls();
  }

  private fetchCalls(): void {
    this.callService.getResolvedCalls(this.page, this.size).subscribe({
      next: (response: HttpResponse<HistoryCallTable>) => {
        console.log("response - total pages: " + response.body?.totalPages)
        console.log("response - items: ", response.body?.items)
        this.totalCountPages = response.body?.totalPages || 1;
        this.calls = response.body?.items ?? [];

        this.calls.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          if (isNaN(dateA) || isNaN(dateB)) {
            console.error('Data inválida encontrada:', a.createdAt, b.createdAt);
            return 0;
          }
          return dateB - dateA;
        });

        this.calls = (response.body?.items ?? []).map(call => {
          call.createdAt = formatDate(call.createdAt);
          call.attendedByName = call.attendedByName ?? '⛔ainda não atendido';

          if (call.attendedTime) {
            call.attendedTime = formatDate(call.attendedTime)
          } else {
            call.attendedTime = '⛔ainda não atendido';
          }

          (call.resolved) ? call.status = '✅' : call.status = '⛔';

          return call;
        });

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

  changePage(page: number): void {
    this.page = page;
    this.fetchCalls();
  }
}
