import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from 'src/app/models/job.model';
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css'],
})
export class JobHistoryComponent {
  pageTitle: string = 'jobs';
  jobs: Job[] = [];
  constructor(private jobService: JobService) {}
  ngOnInit(): void {
    this.jobService.createMockJobs();
    this.jobs = this.jobService.getJobs();
    console.log(this.jobs);
  }
}
