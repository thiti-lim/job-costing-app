import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from './../customer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  constructor(private customerService: CustomerService) {}
  pageTitle: string = 'customers';
  customers: Customer[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'phoneNumber',
    'contact',
  ];

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
  }
}
