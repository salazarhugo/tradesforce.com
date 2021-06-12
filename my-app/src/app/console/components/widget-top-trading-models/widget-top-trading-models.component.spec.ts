import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTopTradingModelsComponent } from './widget-top-trading-models.component';

describe('WidgetTopTradingModelsComponent', () => {
  let component: WidgetTopTradingModelsComponent;
  let fixture: ComponentFixture<WidgetTopTradingModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetTopTradingModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTopTradingModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
