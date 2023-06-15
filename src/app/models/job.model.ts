import { Customer } from './customer.model';

export class Job {
  id: number;
  customer: Customer;
  startDate: Date;
  finishDate: Date;
  overheadRate: number;
  totalMaterialCost: number;
  totalLaborCost: number;
  totalOverheadCost: number;
  status: string;

  constructor(
    id: number,
    customer: Customer,
    startDate: Date,
    finishDate: Date,
    overheadRate: number,
    totalMaterialCost: number,
    totalLaborCost: number,
    totalOverheadCost: number,
    status: string
  ) {
    this.id = id;
    this.customer = customer;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.overheadRate = overheadRate;
    this.totalMaterialCost = totalMaterialCost;
    this.totalLaborCost = totalLaborCost;
    this.totalOverheadCost = totalOverheadCost;
    this.status = status;
  }
}
