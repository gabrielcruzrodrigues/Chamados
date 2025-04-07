import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCallsTableComponent } from './history-calls-table.component';

describe('HistoryCallsTableComponent', () => {
  let component: HistoryCallsTableComponent;
  let fixture: ComponentFixture<HistoryCallsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryCallsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCallsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
