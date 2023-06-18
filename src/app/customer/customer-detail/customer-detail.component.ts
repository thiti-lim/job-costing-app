import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { whitespaceValidator } from 'src/app/helpers/validators';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent {
  pageTitle: string = 'Customer Detail';
  customerForm!: FormGroup;
  isNewCustomer!: boolean;
  customer?: Customer;
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const currentRoute = this.activatedRoute.snapshot;
    if (currentRoute.url.join('/') === 'customer/new') {
      this.isNewCustomer = true;
      this.pageTitle = 'new customer';
    } else {
      this.isNewCustomer = false;
      this.pageTitle = 'update customer';
      const id = Number(
        this.activatedRoute.snapshot.paramMap.get('customerId')
      );
      this.customer = this.customerService.getCustomerById(id);
      console.log(this.customer);
    }
    // Access the current route or perform any desired action
    this.customerForm = this.formBuilder.group({
      name: [
        this.customer?.name ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      location: [
        this.customer?.location ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      contact: [
        this.customer?.contact ?? '',
        [Validators.required, whitespaceValidator()],
      ],
      phoneNumber: [
        this.customer?.phoneNumber ?? '',
        [Validators.required, Validators.pattern(/^0\d{9}$/)],
      ],
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

  returnToList() {
    this.router.navigateByUrl('/customer/list');
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }
    if (this.isNewCustomer) {
      this.customerService.addCustomer(
        this.name!.value,
        this.location!.value,
        this.contact!.value,
        this.phoneNumber!.value
      );
      this.router.navigateByUrl('/customer');
    } else {
      this.customerService.updateCustomer(
        this.customer!.id,
        this.name!.value,
        this.location!.value,
        this.contact!.value,
        this.phoneNumber!.value
      );
      this.router.navigateByUrl('/customer/list');
    }
  }
}
