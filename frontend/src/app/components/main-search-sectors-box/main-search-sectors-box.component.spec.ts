import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchSectorsBoxComponent } from './main-search-sectors-box.component';

describe('MainSearchSectorsBoxComponent', () => {
  let component: MainSearchSectorsBoxComponent;
  let fixture: ComponentFixture<MainSearchSectorsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSearchSectorsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSearchSectorsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
