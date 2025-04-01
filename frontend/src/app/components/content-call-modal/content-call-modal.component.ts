import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-content-call-modal',
    imports: [],
    templateUrl: './content-call-modal.component.html',
    styleUrl: './content-call-modal.component.sass'
})
export class ContentCallModalComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>();

  closeModal(result: boolean): void {
    this.confirm.emit(result);
  }
}
