import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDiversificationComponent } from './portfolio-diversification.component';

describe('PortfolioDiversificationComponent', () => {
  let component: PortfolioDiversificationComponent;
  let fixture: ComponentFixture<PortfolioDiversificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDiversificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDiversificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
