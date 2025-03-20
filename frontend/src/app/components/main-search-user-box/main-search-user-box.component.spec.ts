import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchUserBoxComponent } from './main-search-user-box.component';

describe('MainSearchUserBoxComponent', () => {
  let component: MainSearchUserBoxComponent;
  let fixture: ComponentFixture<MainSearchUserBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSearchUserBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSearchUserBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
