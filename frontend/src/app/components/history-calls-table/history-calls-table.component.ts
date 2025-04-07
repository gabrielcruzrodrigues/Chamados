import { Component, Input } from '@angular/core';
import { MyCallTable } from '../../types/Call';
import { CommonModule } from '@angular/common';
import { SpinningComponent } from "../spinning/spinning.component";
import { ContentCallModalComponent } from "../content-call-modal/content-call-modal.component";

@Component({
  selector: 'app-history-calls-table',
  imports: [
    CommonModule,
    SpinningComponent,
    ContentCallModalComponent
],
  templateUrl: './history-calls-table.component.html',
  styleUrl: './history-calls-table.component.sass'
})
export class HistoryCallsTableComponent {
  @Input() calls: MyCallTable[] = [];
  isLoading: boolean = false;
  contentModalOpen: boolean = false;
  contentModal: string = '';

  openContent(message: string): void {
    this.contentModalOpen = true;
    this.contentModal = message;
  }

  confirm(confirm: boolean): void {
    this.contentModalOpen = false;
  }
}
