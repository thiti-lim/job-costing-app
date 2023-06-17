import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCostListComponent } from './material-cost-list.component';

describe('MaterialCostListComponent', () => {
  let component: MaterialCostListComponent;
  let fixture: ComponentFixture<MaterialCostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialCostListComponent]
    });
    fixture = TestBed.createComponent(MaterialCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
