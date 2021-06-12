import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMastheadComponent } from './product-masthead.component';

describe('ProductMastheadComponent', () => {
  let component: ProductMastheadComponent;
  let fixture: ComponentFixture<ProductMastheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMastheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMastheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
