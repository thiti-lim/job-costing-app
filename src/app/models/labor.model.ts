import { DirectLaborCost } from './direct-labor-cost.model';
import { Job } from './job.model';

export class Labor {
  id: number;
  name: string;
  estimatedHours: number;
  estimatedTotalCost: number;
  actualHours: number = 0;
  actualTotalCost: number = 0;
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
  }
}
