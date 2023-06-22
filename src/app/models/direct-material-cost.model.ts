import { Material } from './material.model';

export class DirectMaterialCost {
  id: number;
  units: number;
  costPerUnit: number;
  seller: string;
  refNo: string;
  date: Date;

  constructor(
    id: number,
    units: number,
    costPerUnit: number,
    seller: string,
    refNo: string,
    date: Date
  ) {
    this.id = id;
    this.units = units;
    this.costPerUnit = costPerUnit;
    this.seller = seller;
    this.refNo = refNo;
    this.date = date;
  }

  get totalCost(): number {
    return this.units * this.costPerUnit;
  }
}
