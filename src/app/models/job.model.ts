import { Material } from './material.model';
import { Labor } from './labor.model';
import { Customer } from './customer.model';
import { JobStatus } from './enums/job-status.enum';

export class Job {
  id: number;
  name: string;
  customer: Customer;
  startDate: Date;
  finishDate: Date;
  materials: Material[] = [];
  labors: Labor[] = [];
  overheadRate: number;
  status: JobStatus;

  constructor(
    id: number,
  name: string,
    customer: Customer,
    startDate: Date,
    finishDate: Date,
    overheadRate: number,
    status: JobStatus
  ) {
    this.id = id;
    this.name = name;
    this.customer = customer;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.overheadRate = overheadRate;
    this.status = status;
  }
}
