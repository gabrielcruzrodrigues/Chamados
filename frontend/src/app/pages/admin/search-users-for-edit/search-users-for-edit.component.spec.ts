import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersForEditComponent } from './search-users-for-edit.component';

describe('SearchUsersForEditComponent', () => {
  let component: SearchUsersForEditComponent;
  let fixture: ComponentFixture<SearchUsersForEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUsersForEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUsersForEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
