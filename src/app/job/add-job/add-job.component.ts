import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import {
  dateValidator,
  formArrayEmptyValidator,
} from 'src/app/helpers/validators';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent {
  pageTitle: string = 'Add Job';
  jobForm!: FormGroup;
  materialForm!: FormGroup;
  laborForm!: FormGroup;
  customers: Customer[] = [];
  isCustomerDropdownOpen = false;
  isStatusDropdownOpen = false;

  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    this.jobForm = this.formBuilder.group({
      name: ['', Validators.required],
      customer: ['', Validators.required],
      startDate: ['', [dateValidator()]],
      finishDate: ['', [dateValidator()]],
      overheadRate: [''],
      materials: this.formBuilder.array([], [formArrayEmptyValidator()]),
      labors: this.formBuilder.array([], [formArrayEmptyValidator()]),
    });
  }

  toggleCustomerDropdown(): void {
    this.isCustomerDropdownOpen = !this.isCustomerDropdownOpen;
  }

  onSubmit(): void {
    console.log(this.jobForm.value);
    console.log(this.customer?.touched);
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }
  }

  get name() {
    return this.jobForm.get('name');
  }

  get customer() {
    return this.jobForm.get('customer');
  }
  get startDate() {
    return this.jobForm.get('startDate');
  }

  get finishDate() {
    return this.jobForm.get('finishDate');
  }
  get overheadRate() {
    return this.jobForm.get('overheadRate');
  }

  get materials() {
    return this.jobForm.controls['materials'] as FormArray;
  }

  get labors() {
    return this.jobForm.controls['labors'] as FormArray;
  }

  selectCustomer(customer: Customer): void {
    this.jobForm.patchValue({ customer: customer });
    this.toggleCustomerDropdown();
  }

  addMaterial() {
    const matForm = this.formBuilder.group({
      materialName: ['', Validators.required],
      estimatedUnits: ['', Validators.required],
      estimatedTotalCost: ['', Validators.required],
    });
    this.materials.push(matForm);
  }

  addLabor() {
    const labForm = this.formBuilder.group({
      laborName: ['', Validators.required],
      estimatedHours: ['', Validators.required],
      estimatedTotalCost: ['', Validators.required],
    });
    this.labors.push(labForm);
  }

  removeMaterial(matIndex: number) {
    this.materials.removeAt(matIndex);
  }

  removeLabor(labIndex: number) {
    this.labors.removeAt(labIndex);
  }
  goBack(): void {
    this.location.back();
  }
}
