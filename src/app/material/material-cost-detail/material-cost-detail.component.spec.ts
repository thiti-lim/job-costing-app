import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCostDetailComponent } from './material-cost-detail.component';

describe('MaterialCostDetailComponent', () => {
  let component: MaterialCostDetailComponent;
  let fixture: ComponentFixture<MaterialCostDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialCostDetailComponent]
    });
    fixture = TestBed.createComponent(MaterialCostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
