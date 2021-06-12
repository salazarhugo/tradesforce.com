import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPortfolioButtonComponent } from './new-portfolio-button.component';

describe('NewPortfolioButtonComponent', () => {
  let component: NewPortfolioButtonComponent;
  let fixture: ComponentFixture<NewPortfolioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPortfolioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPortfolioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
