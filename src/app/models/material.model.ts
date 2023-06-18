import { DirectMaterialCost } from './direct-material-cost.model';

export class Material {
  id: number;
  name: string;
  estimatedUnits: number;
  estimatedTotalCost: number;
  directMaterialCosts: DirectMaterialCost[];

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
    this.directMaterialCosts = [];
  }

  get actualTotalCost(): number {
    return this.directMaterialCosts.reduce(
      (acc, current) => acc + current.costPerUnit * current.units,
      0
    );
  }
  get actualUnits(): number {
    return this.directMaterialCosts.reduce(
      (acc, current) => acc + current.units,
      0
    );
  }

  get costPerUnit(): number {
    if (this.actualUnits == 0) return 0;

    return this.actualTotalCost / this.actualUnits;
  }
}
