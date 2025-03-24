import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersForDeleteComponent } from './search-users-for-delete.component';

describe('SearchUsersForDeleteComponent', () => {
  let component: SearchUsersForDeleteComponent;
  let fixture: ComponentFixture<SearchUsersForDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUsersForDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUsersForDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
