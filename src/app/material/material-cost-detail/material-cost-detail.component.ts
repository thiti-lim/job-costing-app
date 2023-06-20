import { JobService } from 'src/app/job/job.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectMaterialCost } from 'src/app/models/direct-material-cost.model';
import {
  dateValidator,
  positiveNumberValidator,
  whitespaceValidator,
} from 'src/app/helpers/validators';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/components/dialog/add-dialog/add-dialog.component';

@Component({
  selector: 'app-material-cost-detail',
  templateUrl: './material-cost-detail.component.html',
  styleUrls: ['./material-cost-detail.component.css'],
})
export class MaterialCostDetailComponent {
  pageTitle: string = 'Add Material Cost';
  costForm!: FormGroup;
  isNewCost!: boolean;
  jobId!: number;
  matId!: number;
  cost!: DirectMaterialCost;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private jobService: JobService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('dmId');
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('jobId'));
    this.matId = Number(this.activatedRoute.snapshot.paramMap.get('matId'));
    if (id == 'new') {
      this.isNewCost = true;
      this.pageTitle = 'new material cost';
    } else {
      this.isNewCost = false;
      this.pageTitle = 'update material cost';
    }
    this.costForm = this.formBuilder.group({
      name: [
        this.cost?.name ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      refNo: [
        this.cost?.refNo ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      seller: [
        this.cost?.seller ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      units: [
        this.cost?.units ?? '',
        [Validators.required, whitespaceValidator(), positiveNumberValidator()],
      ],
      costPerUnit: [
        this.cost?.costPerUnit ?? '',
        [Validators.required, whitespaceValidator(), positiveNumberValidator()],
      ],
      date: [this.cost?.date ?? '', [dateValidator()]],
    });
  }

  get name() {
    return this.costForm.get('name');
  }
  get refNo() {
    return this.costForm.get('refNo');
  }
  get seller() {
    return this.costForm.get('seller');
  }
  get units() {
    return this.costForm.get('units');
  }
  get costPerUnit() {
    return this.costForm.get('costPerUnit');
  }
  get date() {
    return this.costForm.get('date');
  }

  onSubmit(): void {
    if (this.costForm.invalid) {
      return;
    }
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jobService.addDirectMaterialCost(
          this.jobId,
          this.matId,
          this.name!.value,
          this.refNo!.value,
          this.seller!.value,
          this.units!.value,
          this.costPerUnit!.value,
          this.date!.value
        );
        this.location.back();
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
