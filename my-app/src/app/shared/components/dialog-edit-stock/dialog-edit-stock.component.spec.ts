import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditStockComponent } from './dialog-edit-stock.component';

describe('DialogEditStockComponent', () => {
  let component: DialogEditStockComponent;
  let fixture: ComponentFixture<DialogEditStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
