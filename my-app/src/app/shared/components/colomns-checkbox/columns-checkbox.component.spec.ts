import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnsCheckboxComponent} from './columns-checkbox.component';

describe('ColomnsCheckboxComponent', () => {
  let component: ColumnsCheckboxComponent;
  let fixture: ComponentFixture<ColumnsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnsCheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
