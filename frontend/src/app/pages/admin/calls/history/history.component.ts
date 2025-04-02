import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { MyCallsTableComponent } from "../../../../components/my-calls-table/my-calls-table.component";
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { MyCallTable } from '../../../../types/Call';
import { CallService } from '../../../../services/call.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '../../../../utils/FormatData';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-history',
  imports: [MainNavbarComponent, TopUserInfosComponent, MyCallsTableComponent, SpinningComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.sass'
})
export class HistoryComponent {
  title: string = 'Histórico';
  calls: MyCallTable[] = [];
  isLoading: boolean = true;

  constructor
    (
      private callService: CallService,
      private router: Router,
      private toastr: ToastrService,
      private authService: AuthService
    ) { }

  async ngOnInit(): Promise<void> {
    this.callService.getResolvedCalls().subscribe({
      next: (response: HttpResponse<MyCallTable[]>) => {
        this.calls = response.body ?? [];

        this.calls.sort((a, b) => {
          console.log('Comparando:', a.createdAt, b.createdAt); 
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          if (isNaN(dateA) || isNaN(dateB)) {
            console.error('Data inválida encontrada:', a.createdAt, b.createdAt);
            return 0;
          }
          return dateB - dateA;
        });

        this.calls = (response.body ?? []).map(call => {
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
}
