import { Labor } from './labor.model';

export class DirectLaborCost {
  id: number;
  refNo: string;
  costPerHour: number;
  hours: number;
  date: Date;

  constructor(
    id: number,
    refNo: string,
    costPerHour: number,
    hours: number,
    date: Date
  ) {
    this.id = id;
    this.costPerHour = costPerHour;
    this.hours = hours;
    this.refNo = refNo;
    this.date = date;
  }

  get totalCost(): number {
    return this.hours * this.costPerHour;
  }
}
