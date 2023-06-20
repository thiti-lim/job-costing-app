import { Material } from './material.model';
import { Labor } from './labor.model';
import { Customer } from './customer.model';

export class Job {
  id: number;
  name: string;
  customer: Customer;
  startDate: Date;
  finishDate: Date;
  materials: Material[] = [];
  labors: Labor[] = [];
  overheadRate: number;

  constructor(
    id: number,
    name: string,
    customer: Customer,
    startDate: Date,
    finishDate: Date,
    overheadRate: number,
    materials: Material[],
    labors: Labor[]
  ) {
    this.id = id;
    this.name = name;
    this.customer = customer;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.overheadRate = overheadRate;
    this.materials = materials;
    this.labors = labors;
  }
}
