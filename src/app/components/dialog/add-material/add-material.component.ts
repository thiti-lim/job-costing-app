import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  positiveNumberValidator,
  whitespaceValidator,
} from 'src/app/helpers/validators';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css'],
})
export class AddMaterialComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMaterialComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      materialName: ['', [Validators.required, whitespaceValidator()]],
      estimatedUnits: [
        '',
        [Validators.required, whitespaceValidator(), positiveNumberValidator()],
      ],
      estimatedCostPerUnit: [
        '',
        [Validators.required, positiveNumberValidator()],
      ],
    });
  }

  get materialName() {
    return this.form.get('materialName');
  }

  get estimatedUnits() {
    return this.form.get('estimatedUnits');
  }
  get estimatedCostPerUnit() {
    return this.form.get('estimatedCostPerUnit');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.dialogRef.close(formData);
    }
  }
}
