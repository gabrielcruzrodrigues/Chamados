import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCallModalComponent } from './content-call-modal.component';

describe('ContentCallModalComponent', () => {
  let component: ContentCallModalComponent;
  let fixture: ComponentFixture<ContentCallModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCallModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
