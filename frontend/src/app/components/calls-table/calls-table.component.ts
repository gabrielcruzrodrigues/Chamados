import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CallTable } from '../../types/Call';
import { SpinningComponent } from "../spinning/spinning.component";
import { AuthService } from '../../services/auth.service';
import { CallService } from '../../services/call.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ContentCallModalComponent } from "../content-call-modal/content-call-modal.component";

@Component({
  selector: 'app-calls-table',
  imports: [
    CommonModule,
    SpinningComponent,
    ContentCallModalComponent
  ],
  templateUrl: './calls-table.component.html',
  styleUrl: './calls-table.component.sass'
})
export class CallsTableComponent implements OnInit {
  @Input() calls: CallTable[] = [];

  isLoading: boolean = false;
  userRole: number = 1;
  userId: string = '0';
  contentModalOpen: boolean = false;
  contentModal: string = '';

  constructor(
    private authService: AuthService,
    private callService: CallService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.userRole = await this.authService.getRole();
    this.userId = await this.authService.getId();
  }

  openModal(id: number, option: string, event: Event): void {
    event.stopPropagation();
    if (option === 'resolved') {
      this.callService.resolved(id, this.userId).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 204) {
            this.toastr.success("chamado marcado como resolvido!");
            this.calls = [...this.calls.filter(call => call.id !== id)];
          } else {
            this.toastr.info("Uma resposta inesperada foi recebida, entre em contato com um administrador!");
          }
        },
        error: (error) => {
          if (error.status === 500) {
            this.toastr.error("Houve um erro ao tentar marcar um dos seus chamados como resolvido, procure um administrador do sistema!");
            this.isLoading = false;
          }
          this.isLoading = false;
        }
      })
    }
  }

  openContent(message: string): void {
    this.contentModalOpen = true;
    this.contentModal = message;
  }

  confirm(confirm: boolean): void {
    this.contentModalOpen = false;
  }
}
