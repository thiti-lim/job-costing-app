import { JobService } from './../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from './../../models/job.model';
import { Component } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { Labor } from 'src/app/models/labor.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent {
  pageTitle: string = 'job detail';
  job!: Job;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('jobId'));
    this.job = this.jobService.getJobById(id)!;
    console.log(this.job);
  }

  toDirectMaterialCostList(material: Material): void {
    this.router.navigate([this.router.url, 'material', material.id, 'costs']);
  }

  toDirectLaborCostList(labor: Labor): void {
    this.router.navigate([this.router.url, 'labor', labor.id, 'costs']);
  }

  toDirectMaterialCostAdd(material: Material): void {
    this.router.navigate([
      this.router.url,
      'material',
      material.id,
      'costs',
      'new',
    ]);
  }
  toDirectLaborCostAdd(labor: Labor): void {
    this.router.navigate([this.router.url, 'labor', labor.id, 'costs', 'new']);
  }

  goBack(): void {
    this.router.navigate(['/job/history']);
  }
}
