import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { DirectMaterialCost } from 'src/app/models/direct-material-cost.model';
import { JobService } from 'src/app/job/job.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-material-cost-list',
  templateUrl: './material-cost-list.component.html',
  styleUrls: ['./material-cost-list.component.css'],
})
export class MaterialCostListComponent {
  pageTitle: string = 'Material Costs';
  costList: DirectMaterialCost[] = [];
  jobId!: number;
  materialId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.activatedRoute.snapshot.url[1].path);
    this.materialId = Number(this.activatedRoute.snapshot.url[3].path);
    this.costList = this.jobService.getDirectMaterialCosts(
      this.jobId,
      this.materialId
    );
    console.log(this.costList);
  }

  editCost(cost: DirectMaterialCost): void {
    this.router.navigate([this.router.url, cost.id]);
  }

  deleteCost(cost: DirectMaterialCost): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jobService.removeDirectMaterialCost(
          this.jobId,
          this.materialId,
          cost.id
        );
      }
    });
  }
}
