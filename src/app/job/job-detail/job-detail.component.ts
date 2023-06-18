import { JobService } from './../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from './../../models/job.model';
import { Component } from '@angular/core';

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
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.job = this.jobService.getJobById(id)!;
    console.log(this.job);
  }

  toMaterialDetail(): void {
    console.log(this.router.url);
    this.router.navigate([this.router.url + '/material', 1]);
  }

  toMaterialAdd(): void {
    this.router.navigate(['/customer/new']);
  }
}
