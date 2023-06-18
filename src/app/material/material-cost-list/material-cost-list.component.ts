import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DirectMaterialCost } from 'src/app/models/direct-material-cost.model';
import { JobService } from 'src/app/job/job.service';

@Component({
  selector: 'app-material-cost-list',
  templateUrl: './material-cost-list.component.html',
  styleUrls: ['./material-cost-list.component.css'],
})
export class MaterialCostListComponent {
  pageTitle: string = 'Material Costs';
  costList: DirectMaterialCost[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.activatedRoute.snapshot.url[1].path);
    const matId = Number(this.activatedRoute.snapshot.url[3].path);
    this.costList = this.jobService.getDirectMaterialCosts(jobId, matId);
    console.log(this.costList);
  }

  editCost(cost: DirectMaterialCost): void {}

  deleteCost(cost: DirectMaterialCost): void {}
}
