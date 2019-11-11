import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBioComponent } from './general-bio.component';

describe('GeneralBioComponent', () => {
  let component: GeneralBioComponent;
  let fixture: ComponentFixture<GeneralBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
