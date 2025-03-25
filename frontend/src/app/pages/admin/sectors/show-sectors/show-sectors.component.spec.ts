import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSectorsComponent } from './show-sectors.component';

describe('ShowSectorsComponent', () => {
  let component: ShowSectorsComponent;
  let fixture: ComponentFixture<ShowSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
