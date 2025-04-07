import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalNumberPages: number = 1;
  actualPage: number = 1;
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

  changePage(page: number): void {
    this.actualPage = page + 1;
    this.pageSelected.emit(page + 1);
  }

  backPage(): void {
    
  }

  nextPage(): void {

  }
}
