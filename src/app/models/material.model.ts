import { DirectMaterialCost } from './direct-material-cost.model';

export class Material {
  id: number;
  name: string;
  estimatedUnits: number;
  estimatedTotalCost: number;
  actualUnits: number = 0;
  actualCost: number = 0;
  directMaterialCosts: DirectMaterialCost[] = [];

  constructor(
    id: number,
    name: string,
    estimatedUnits: number,
    estimatedTotalCost: number
  ) {
    this.id = id;
    this.name = name;
    this.estimatedUnits = estimatedUnits;
    this.estimatedTotalCost = estimatedTotalCost;
  }
}
