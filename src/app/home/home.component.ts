import { Customer } from './../models/customer.model';
import { JobService } from 'src/app/job/job.service';
import { CustomerService } from './../customer/customer.service';
import { Component } from '@angular/core';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pageTitle: string = 'dashboard';
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}
  ngOnInit(): void {
    this.jobs = this.jobService.getJobs();
  }
}
