import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCountryPickerComponent } from './dialog-country-picker.component';

describe('DialogCountryPickerComponent', () => {
  let component: DialogCountryPickerComponent;
  let fixture: ComponentFixture<DialogCountryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCountryPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCountryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
