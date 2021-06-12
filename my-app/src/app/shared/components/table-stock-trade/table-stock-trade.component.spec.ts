import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStockTradeComponent } from './table-stock-trade.component';

describe('TableStockTradeComponent', () => {
  let component: TableStockTradeComponent;
  let fixture: ComponentFixture<TableStockTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableStockTradeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStockTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
