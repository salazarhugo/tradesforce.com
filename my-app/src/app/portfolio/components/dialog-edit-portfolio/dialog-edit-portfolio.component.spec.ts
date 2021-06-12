import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPortfolioComponent } from './dialog-edit-portfolio.component';

describe('DialogEditPortfolioComponent', () => {
  let component: DialogEditPortfolioComponent;
  let fixture: ComponentFixture<DialogEditPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
