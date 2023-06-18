import { DirectLaborCost } from './direct-labor-cost.model';

export class Labor {
  id: number;
  name: string;
  estimatedHours: number;
  estimatedTotalCost: number;
  directLaborCosts: DirectLaborCost[] = [];

  constructor(
    id: number,
    name: string,
    estimatedHours: number,
    estimatedTotalCost: number
  ) {
    this.id = id;
    this.name = name;
    this.estimatedHours = estimatedHours;
    this.estimatedTotalCost = estimatedTotalCost;
    this.directLaborCosts = [];
  }

  get actualTotalCost(): number {
    return this.directLaborCosts.reduce(
      (acc, current) => acc + current.costPerHour * current.hours,
      0
    );
  }
  get actualHours(): number {
    return this.directLaborCosts.reduce(
      (acc, current) => acc + current.hours,
      0
    );
  }

  get costPerHour(): number {
    return this.actualTotalCost / this.actualHours;
  }
}
