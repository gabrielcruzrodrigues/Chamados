import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCallsComponent } from './show-calls.component';

describe('ShowCallsComponent', () => {
  let component: ShowCallsComponent;
  let fixture: ComponentFixture<ShowCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
