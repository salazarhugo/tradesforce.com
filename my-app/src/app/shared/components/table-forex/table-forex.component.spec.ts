import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableForexComponent } from './table-forex.component';

describe('TableForexComponent', () => {
  let component: TableForexComponent;
  let fixture: ComponentFixture<TableForexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableForexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
