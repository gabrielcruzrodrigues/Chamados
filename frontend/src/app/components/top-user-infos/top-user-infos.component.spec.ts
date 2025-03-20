import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUserInfosComponent } from './top-user-infos.component';

describe('TopUserInfosComponent', () => {
  let component: TopUserInfosComponent;
  let fixture: ComponentFixture<TopUserInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUserInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
