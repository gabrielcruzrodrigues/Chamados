import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCallComponent } from './success-call.component';

describe('SuccessCallComponent', () => {
  let component: SuccessCallComponent;
  let fixture: ComponentFixture<SuccessCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
