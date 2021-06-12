import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsmComponent } from './csm.component';

describe('CsmComponent', () => {
  let component: CsmComponent;
  let fixture: ComponentFixture<CsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
