import { Labor } from './labor.model';

export class DirectLaborCost {
  id: number;
  name: string;
  refNo: string;
  ratePerHour: number;
  hours: number;
  date: Date;

  constructor(
    id: number,
    name: string,
    refNo: string,
    ratePerHour: number,
    hours: number,
    date: Date
  ) {
    this.id = id;
    this.name = name;
    this.ratePerHour = ratePerHour;
    this.hours = hours;
    this.refNo = refNo;
    this.date = date;
  }
}
