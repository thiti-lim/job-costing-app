import { DirectLaborCost } from './direct-labor-cost.model';

export class Labor {
  id: number;
  name: string;
  estimatedHours: number;
  estimatedRatePerHour: number;
  directLaborCosts: DirectLaborCost[] = [];

  constructor(
    id: number,
    name: string,
    estimatedHours: number,
    estimatedRatePerHour: number
  ) {
    this.id = id;
    this.name = name;
    this.estimatedHours = estimatedHours;
    this.estimatedRatePerHour = estimatedRatePerHour;
    this.directLaborCosts = [];
  }

  get estimatedTotalCost(): number {
    return this.estimatedHours * this.estimatedRatePerHour;
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

  get actualRatePerHour(): number {
    if (this.actualHours == 0) return 0;
    return this.actualTotalCost / this.actualHours;
  }
}
