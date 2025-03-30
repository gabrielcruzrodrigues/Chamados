import { Component, Input } from '@angular/core';
import { MyCallTable } from '../../types/Call';
import { CommonModule } from '@angular/common';
import { SpinningComponent } from "../spinning/spinning.component";

@Component({
  selector: 'app-my-calls-table',
  standalone: true,
  imports: [CommonModule, SpinningComponent],
  templateUrl: './my-calls-table.component.html',
  styleUrl: './my-calls-table.component.sass'
})
export class MyCallsTableComponent {
  @Input() calls: MyCallTable[] = [];
  isLoading: boolean = false;
}
