import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DirectLaborCost } from 'src/app/models/direct-labor-cost.model';
import { JobService } from 'src/app/job/job.service';
import {
  dateValidator,
  positiveNumberValidator,
  whitespaceValidator,
} from 'src/app/helpers/validators';
import { AddDialogComponent } from 'src/app/components/dialog/add-dialog/add-dialog.component';
import { EditDialogComponent } from 'src/app/components/dialog/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-labor-cost-detail',
  templateUrl: './labor-cost-detail.component.html',
  styleUrls: ['./labor-cost-detail.component.css'],
})
export class LaborCostDetailComponent {
  pageTitle: string = 'Add Labor Cost';
  costForm!: FormGroup;
  isNewCost!: boolean;
  jobId!: number;
  labId!: number;
  cost?: DirectLaborCost;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private jobService: JobService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('dlId');
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('jobId'));
    this.labId = Number(this.activatedRoute.snapshot.paramMap.get('labId'));
    console.log(id);
    if (id == 'new') {
      this.isNewCost = true;
      this.pageTitle = 'new labor cost';
    } else {
      this.isNewCost = false;
      this.pageTitle = 'update labor cost';
      this.cost = this.jobService.getDirectLaborCostById(
        this.jobId,
        this.labId,
        Number(id)
      );
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
      hours: [
        this.cost?.hours.toString() ?? '',
        [Validators.required, whitespaceValidator(), positiveNumberValidator()],
      ],
      costPerHour: [
        this.cost?.costPerHour.toString() ?? '',
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
  get hours() {
    return this.costForm.get('hours');
  }
  get costPerHour() {
    return this.costForm.get('costPerHour');
  }
  get date() {
    return this.costForm.get('date');
  }

  onSubmit(): void {
    if (this.costForm.invalid) {
      return;
    }
    const dialogRef = this.isNewCost
      ? this.dialog.open(AddDialogComponent)
      : this.dialog.open(EditDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isNewCost) {
          this.jobService.addDirectLaborCost(
            this.jobId,
            this.labId,
            this.name!.value,
            this.refNo!.value,
            this.hours!.value,
            this.costPerHour!.value,
            this.date!.value
          );
          this.location.back();
        } else {
          this.jobService.updateDirectLaborCost(
            this.jobId,
            this.labId,
            this.cost!.id,
            this.name!.value,
            this.refNo!.value,
            this.hours!.value,
            this.costPerHour!.value,
            this.date!.value
          );
          this.location.back();
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
