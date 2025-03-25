import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectorsComponent } from './create-sectors.component';

describe('CreateSectorsComponent', () => {
  let component: CreateSectorsComponent;
  let fixture: ComponentFixture<CreateSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
