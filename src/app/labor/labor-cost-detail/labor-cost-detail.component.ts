import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-labor-cost-detail',
  templateUrl: './labor-cost-detail.component.html',
  styleUrls: ['./labor-cost-detail.component.css'],
})
export class LaborCostDetailComponent {
  pageTitle: string = 'Add Direct Labor Cost';
  costForm!: FormGroup;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.costForm = new FormGroup({});
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
