import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LarsMatNavListComponent } from './lars-mat-nav-list.component';

describe('LarsMatNavListComponent', () => {
  let component: LarsMatNavListComponent;
  let fixture: ComponentFixture<LarsMatNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LarsMatNavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LarsMatNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
