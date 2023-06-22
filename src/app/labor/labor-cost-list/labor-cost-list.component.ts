import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { JobService } from 'src/app/job/job.service';
import { DirectLaborCost } from 'src/app/models/direct-labor-cost.model';

@Component({
  selector: 'app-labor-cost-list',
  templateUrl: './labor-cost-list.component.html',
  styleUrls: ['./labor-cost-list.component.css'],
})
export class LaborCostListComponent {
  pageTitle: string = 'Labor Costs';
  costList: DirectLaborCost[] = [];
  jobId!: number;
  laborId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('jobId'));
    this.laborId = Number(this.activatedRoute.snapshot.paramMap.get('labId'));
    this.costList = this.jobService.getDirectLaborCostList(
      this.jobId,
      this.laborId
    );
  }

  editCost(cost: DirectLaborCost): void {
    this.router.navigate([this.router.url, cost.id]);
  }

  deleteCost(cost: DirectLaborCost): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jobService.removeDirectLaborCost(
          this.jobId,
          this.laborId,
          cost.id
        );
      }
    });
  }

  addLaborCost(): void {
    this.router.navigate([this.router.url, 'new']);
  }

  goBack(): void {
    this.router.navigate(['job', this.jobId]);
  }
}
