import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-cost-detail',
  templateUrl: './material-cost-detail.component.html',
  styleUrls: ['./material-cost-detail.component.css'],
})
export class MaterialCostDetailComponent {
  pageTitle: string = 'Add Material Cost';
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
