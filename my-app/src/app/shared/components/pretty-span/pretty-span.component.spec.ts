import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettySpanComponent } from './pretty-span.component';

describe('PrettySpanComponent', () => {
  let component: PrettySpanComponent;
  let fixture: ComponentFixture<PrettySpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettySpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettySpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
