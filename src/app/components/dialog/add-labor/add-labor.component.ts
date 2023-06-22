import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  positiveNumberValidator,
  whitespaceValidator,
} from 'src/app/helpers/validators';

@Component({
  selector: 'app-add-labor',
  templateUrl: './add-labor.component.html',
  styleUrls: ['./add-labor.component.css'],
})
export class AddLaborComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddLaborComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      laborName: ['', [Validators.required, whitespaceValidator()]],
      estimatedHours: [
        '',
        [Validators.required, whitespaceValidator(), positiveNumberValidator()],
      ],
      estimatedRatePerHour: [
        '',
        [Validators.required, positiveNumberValidator()],
      ],
    });
  }

  get laborName() {
    return this.form.get('laborName');
  }

  get estimatedHours() {
    return this.form.get('estimatedHours');
  }
  get estimatedRatePerHour() {
    return this.form.get('estimatedRatePerHour');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.dialogRef.close(formData);
    }
  }
}
