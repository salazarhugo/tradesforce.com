import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModelsComponent } from './my-models.component';

describe('MyModelsComponent', () => {
  let component: MyModelsComponent;
  let fixture: ComponentFixture<MyModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
