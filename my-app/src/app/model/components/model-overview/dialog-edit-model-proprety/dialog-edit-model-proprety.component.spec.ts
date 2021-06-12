import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditModelPropretyComponent } from './dialog-edit-model-proprety.component';

describe('DialogEditModelPropretyComponent', () => {
  let component: DialogEditModelPropretyComponent;
  let fixture: ComponentFixture<DialogEditModelPropretyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditModelPropretyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditModelPropretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
