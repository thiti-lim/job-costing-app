import { DirectMaterialCost } from './direct-material-cost.model';

export class Material {
  id: number;
  name: string;
  estimatedUnits: number;
  estimatedCostPerUnit: number;
  directMaterialCosts: DirectMaterialCost[];

  constructor(
    id: number,
    name: string,
    estimatedUnits: number,
    estimatedCostPerUnit: number
  ) {
    this.id = id;
    this.name = name;
    this.estimatedUnits = estimatedUnits;
    this.estimatedCostPerUnit = estimatedCostPerUnit;
    this.directMaterialCosts = [];
  }

  get estimatedTotalCost(): number {
    if (this.estimatedUnits == 0) return 0;

    return this.estimatedUnits * this.estimatedCostPerUnit;
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

  get actualCostPerUnit(): number {
    if (this.actualUnits == 0) return 0;

    return this.actualTotalCost / this.actualUnits;
  }
}
