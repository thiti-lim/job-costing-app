import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from 'src/app/models/job.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css'],
})
export class JobHistoryComponent {
  pageTitle: string = 'jobs';
  jobs: Job[] = [];
  constructor(
    private jobService: JobService,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.jobs = this.jobService.getJobs();
  }

  toJobDetail(job: Job): void {
    this.router.navigate(['/job', job.id]);
  }

  addJob(): void {
    this.router.navigate(['job/new']);
  }

  goBack(): void {
    this.location.back();
  }
}
