import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { whitespaceValidator } from 'src/app/helpers/validators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent {
  pageTitle: string = 'Customer Detail';
  customerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required, whitespaceValidator()]],
      location: ['', [Validators.required, whitespaceValidator()]],
      contact: ['', [Validators.required, whitespaceValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  get name() {
    return this.customerForm.get('name');
  }

  get location() {
    return this.customerForm.get('location');
  }
  get contact() {
    return this.customerForm.get('contact');
  }
  get phoneNumber() {
    return this.customerForm.get('phoneNumber');
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }
    console.log(this.customerForm.value);
  }
}
