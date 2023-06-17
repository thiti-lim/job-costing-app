import { Material } from './material.model';

export class DirectMaterialCost {
  id: number;
  name: string;
  units: number;
  costPerUnit: number;
  seller: string;
  refNo: string;
  date: Date;

  constructor(
    id: number,
    name: string,
    units: number,
    costPerUnit: number,
    seller: string,
    refNo: string,
    date: Date
  ) {
    this.id = id;
    this.name = name;
    this.units = units;
    this.costPerUnit = costPerUnit;
    this.seller = seller;
    this.refNo = refNo;
    this.date = date;
  }
}
