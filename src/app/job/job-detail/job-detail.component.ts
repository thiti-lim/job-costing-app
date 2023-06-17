import { JobService } from './../job.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.job = this.jobService.getJobById(id)!;
    console.log(this.job);
  }
}
