import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalNumberPages: number = 1;
  actualPage: number = 0;
  pages: number[] = [];
  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.generatePages();
  }

  ngOnChanges(): void {
    this.generatePages();
  }

  private generatePages(): void {
    this.pages = [];
    if (this.totalNumberPages > 0) {
      for (let i = 1; i <= this.totalNumberPages; i++) {
        this.pages.push(i);
      }
    }
  }

  changePage(page: number = 1, option: string): void {
    this.actualPage = page;
    switch(option) {
      case 'random':
        this.pageSelected.emit(page + 1);
        break;
      case 'next':
        this.pageSelected.emit(this.actualPage + 1);
        break;
      case 'back':
        this.pageSelected.emit(this.actualPage - 1);
        break;
    }
  }
}
