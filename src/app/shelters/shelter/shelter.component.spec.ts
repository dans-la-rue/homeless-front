import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterComponent } from './shelter.component';

describe('ShelterComponent', () => {
  let component: ShelterComponent;
  let fixture: ComponentFixture<ShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
