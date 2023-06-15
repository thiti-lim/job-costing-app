import { Job } from './job.model';

export class Labor {
  id: number;
  job: Job;
  name: string;
  estimatedHours: number;
  estimatedTotalCost: number;
  actualHours: number = 0;
  actualTotalCost: number = 0;

  constructor(
    id: number,
    job: Job,
    name: string,
    estimatedHours: number,
    estimatedTotalCost: number
  ) {
    this.id = id;
    this.job = job;
    this.name = name;
    this.estimatedHours = estimatedHours;
    this.estimatedTotalCost = estimatedTotalCost;
  }
}
