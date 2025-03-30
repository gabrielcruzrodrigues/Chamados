import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyCallsComponent } from './list-my-calls.component';

describe('ListMyCallsComponent', () => {
  let component: ListMyCallsComponent;
  let fixture: ComponentFixture<ListMyCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMyCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMyCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
