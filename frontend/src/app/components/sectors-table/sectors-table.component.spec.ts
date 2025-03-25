import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsTableComponent } from './sectors-table.component';

describe('SectorsTableComponent', () => {
  let component: SectorsTableComponent;
  let fixture: ComponentFixture<SectorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
