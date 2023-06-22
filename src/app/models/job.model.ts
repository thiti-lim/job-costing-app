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

  get estimatedMaterialCost(): number {
    return this.materials.reduce(
      (acc, current) => acc + current.estimatedTotalCost,
      0
    );
  }
  get actualMaterialCost(): number {
    return this.materials.reduce(
      (acc, current) => acc + current.actualTotalCost,
      0
    );
  }

  get estimatedMaterialUnits(): number {
    return this.materials.reduce(
      (acc, current) => acc + current.estimatedUnits,
      0
    );
  }
  get actualMaterialUnits(): number {
    return this.materials.reduce(
      (acc, current) => acc + current.actualUnits,
      0
    );
  }

  get estimatedLaborCost(): number {
    return this.labors.reduce(
      (acc, current) => acc + current.estimatedTotalCost,
      0
    );
  }
  get actualLaborCost(): number {
    return this.labors.reduce(
      (acc, current) => acc + current.actualTotalCost,
      0
    );
  }

  get estimatedLaborHours(): number {
    return this.labors.reduce(
      (acc, current) => acc + current.estimatedHours,
      0
    );
  }
  get actualLaborHours(): number {
    return this.labors.reduce((acc, current) => acc + current.actualHours, 0);
  }

  get totalJobCost(): number {
    return (
      this.actualLaborCost +
      this.actualLaborCost +
      this.actualLaborCost * (this.overheadRate / 100)
    );
  }

  get estimateJobCost(): number {
    return (
      this.estimatedMaterialCost +
      this.estimatedLaborCost +
      this.estimatedLaborCost * (this.overheadRate / 100)
    );
  }
}
