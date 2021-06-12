import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletePortfolioComponent } from './dialog-delete-portfolio.component';

describe('DialogDeletePortfolioComponent', () => {
  let component: DialogDeletePortfolioComponent;
  let fixture: ComponentFixture<DialogDeletePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeletePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeletePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
