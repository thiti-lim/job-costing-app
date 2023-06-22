import { JobService } from './../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from './../../models/job.model';
import { Component } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { Labor } from 'src/app/models/labor.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';

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
    private jobService: JobService,
    private location: Location,
    private dialog: MatDialog
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

  getProgressBarWidth(actual: number, estimate: number) {
    return Math.min(100, (actual / estimate) * 100);
  }

  calculatePercentError(actual: number, estimate: number) {
    return (Math.abs(estimate - actual) / estimate) * 100;
  }

  removeJob(job: Job): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jobService.removeJob(job.id);
        this.goBack();
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
