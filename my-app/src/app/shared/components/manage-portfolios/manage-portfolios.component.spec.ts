import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePortfoliosComponent } from './manage-portfolios.component';

describe('ManagePortfoliosComponent', () => {
  let component: ManagePortfoliosComponent;
  let fixture: ComponentFixture<ManagePortfoliosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePortfoliosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
