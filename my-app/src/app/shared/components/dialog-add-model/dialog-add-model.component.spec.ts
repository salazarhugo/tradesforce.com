import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddModelComponent } from './dialog-add-model.component';

describe('DialogAddModelComponent', () => {
  let component: DialogAddModelComponent;
  let fixture: ComponentFixture<DialogAddModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
