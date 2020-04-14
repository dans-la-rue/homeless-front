import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersListComponent } from './shelters-list.component';

describe('ProfileComponent', () => {
  let component: SheltersListComponent;
  let fixture: ComponentFixture<SheltersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheltersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheltersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
