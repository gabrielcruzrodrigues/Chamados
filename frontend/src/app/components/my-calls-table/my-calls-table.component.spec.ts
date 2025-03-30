import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCallsTableComponent } from './my-calls-table.component';

describe('MyCallsTableComponent', () => {
  let component: MyCallsTableComponent;
  let fixture: ComponentFixture<MyCallsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCallsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCallsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
