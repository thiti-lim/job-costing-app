import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaborComponent } from './add-labor.component';

describe('AddLaborComponent', () => {
  let component: AddLaborComponent;
  let fixture: ComponentFixture<AddLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLaborComponent]
    });
    fixture = TestBed.createComponent(AddLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
