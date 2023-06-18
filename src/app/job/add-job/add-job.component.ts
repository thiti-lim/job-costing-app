import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent {
  pageTitle: string = 'Add Job';
  jobForm!: FormGroup;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.jobForm = new FormGroup({});
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      return;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
