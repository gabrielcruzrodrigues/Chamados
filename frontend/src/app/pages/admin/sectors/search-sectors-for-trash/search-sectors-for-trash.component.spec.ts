import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSectorsForTrashComponent } from './search-sectors-for-trash.component';

describe('SearchSectorsForTrashComponent', () => {
  let component: SearchSectorsForTrashComponent;
  let fixture: ComponentFixture<SearchSectorsForTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSectorsForTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSectorsForTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
