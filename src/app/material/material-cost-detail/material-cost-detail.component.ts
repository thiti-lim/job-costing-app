import { JobService } from 'src/app/job/job.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectMaterialCost } from 'src/app/models/direct-material-cost.model';

@Component({
  selector: 'app-material-cost-detail',
  templateUrl: './material-cost-detail.component.html',
  styleUrls: ['./material-cost-detail.component.css'],
})
export class MaterialCostDetailComponent {
  pageTitle: string = 'Add Material Cost';
  costForm!: FormGroup;
  isNewCost!: boolean;
  cost!: DirectMaterialCost;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.costForm = new FormGroup({});
    const id = this.activatedRoute.snapshot.paramMap.get('dmId');
    if (id == 'new') {
      this.isNewCost = true;
      this.pageTitle = 'new material cost';
    } else {
      this.isNewCost = false;
      this.pageTitle = 'update material cost';
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
