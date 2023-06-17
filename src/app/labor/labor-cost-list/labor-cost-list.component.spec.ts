import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborCostListComponent } from './labor-cost-list.component';

describe('LaborCostListComponent', () => {
  let component: LaborCostListComponent;
  let fixture: ComponentFixture<LaborCostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborCostListComponent]
    });
    fixture = TestBed.createComponent(LaborCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
