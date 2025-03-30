import { Component, OnInit } from '@angular/core';
import { MainNavbarComponent } from "../../../../components/main-navbar/main-navbar.component";
import { TopUserInfosComponent } from "../../../../components/top-user-infos/top-user-infos.component";
import { MyCallsTableComponent } from "../../../../components/my-calls-table/my-calls-table.component";
import { MyCallTable } from '../../../../types/Call';
import { CallService } from '../../../../services/call.service';
import { Router } from '@angular/router';
import { SpinningComponent } from "../../../../components/spinning/spinning.component";
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '../../../../utils/FormatData';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-list-my-calls',
  standalone: true,
  imports: [MainNavbarComponent, TopUserInfosComponent, MyCallsTableComponent, SpinningComponent],
  templateUrl: './list-my-calls.component.html',
  styleUrl: './list-my-calls.component.sass'
})
export class ListMyCallsComponent implements OnInit {
  title: string = 'Meus chamados';
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
    const userId = await this.authService.getId();
    this.callService.getByUserId(userId).subscribe({
      next: (response: HttpResponse<MyCallTable[]>) => {
        console.log(response.body)
        if (response.body?.length === 0)
          this.toastr.info("Você nunca abriu um chamado!");


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
