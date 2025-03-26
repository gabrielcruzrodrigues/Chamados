import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSectorsForEditComponent } from './search-sectors-for-edit.component';

describe('SearchSectorsForEditComponent', () => {
  let component: SearchSectorsForEditComponent;
  let fixture: ComponentFixture<SearchSectorsForEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSectorsForEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSectorsForEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
