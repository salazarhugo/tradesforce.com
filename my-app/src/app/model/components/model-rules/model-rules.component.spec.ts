import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRulesComponent } from './model-rules.component';

describe('ModelRulesComponent', () => {
  let component: ModelRulesComponent;
  let fixture: ComponentFixture<ModelRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
