import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborCostDetailComponent } from './labor-cost-detail.component';

describe('LaborCostDetailComponent', () => {
  let component: LaborCostDetailComponent;
  let fixture: ComponentFixture<LaborCostDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborCostDetailComponent]
    });
    fixture = TestBed.createComponent(LaborCostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
