import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDistributionComponent } from './sector-distribution.component';

describe('SectorDistributionComponent', () => {
  let component: SectorDistributionComponent;
  let fixture: ComponentFixture<SectorDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
