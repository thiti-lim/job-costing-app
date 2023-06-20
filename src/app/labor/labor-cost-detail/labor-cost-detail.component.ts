import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DirectLaborCost } from 'src/app/models/direct-labor-cost.model';

@Component({
  selector: 'app-labor-cost-detail',
  templateUrl: './labor-cost-detail.component.html',
  styleUrls: ['./labor-cost-detail.component.css'],
})
export class LaborCostDetailComponent {
  pageTitle: string = 'Add Labor Cost';
  costForm!: FormGroup;
  isNewCost!: boolean;
  cost!: DirectLaborCost;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.costForm = new FormGroup({});
    const id = this.activatedRoute.snapshot.paramMap.get('dlId');
    console.log(id);
    if (id == 'new') {
      this.isNewCost = true;
      this.pageTitle = 'new labor cost';
    } else {
      this.isNewCost = false;
      this.pageTitle = 'update labor cost';
    }
  }

  onSubmit(): void {
    if (this.costForm.invalid) {
      return;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
