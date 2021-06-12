import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlatformOverviewComponent} from './platform-overview.component';

describe('PlatformOverviewComponent', () => {
  let component: PlatformOverviewComponent;
  let fixture: ComponentFixture<PlatformOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformOverviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
