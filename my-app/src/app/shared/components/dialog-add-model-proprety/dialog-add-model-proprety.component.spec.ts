import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddModelPropretyComponent } from './dialog-add-model-proprety.component';

describe('DialogAddModelPropretyComponent', () => {
  let component: DialogAddModelPropretyComponent;
  let fixture: ComponentFixture<DialogAddModelPropretyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddModelPropretyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddModelPropretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
