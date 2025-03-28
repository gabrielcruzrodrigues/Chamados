import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CallTable } from '../../types/Call';
import { SpinningComponent } from "../spinning/spinning.component";

@Component({
  selector: 'app-calls-table',
  standalone: true,
  imports: [
    CommonModule,
    SpinningComponent
],
  templateUrl: './calls-table.component.html',
  styleUrl: './calls-table.component.sass'
})
export class CallsTableComponent {
  @Input() calls: CallTable[] = [];
  isLoading: boolean = false;

  openModal(id: number): void {

  }
}
