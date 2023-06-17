import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from 'src/app/models/job.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css'],
})
export class JobHistoryComponent {
  pageTitle: string = 'jobs';
  jobs: Job[] = [];
  constructor(private jobService: JobService, private router: Router) {}
  ngOnInit(): void {
    this.jobs = this.jobService.getJobs();
    console.log(this.jobs);
  }

  toJobDetail(job: Job): void {
    this.router.navigate(['/job', job.id]);
  }
}
