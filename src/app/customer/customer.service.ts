import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: Customer[] = [
    new Customer(1, 'Acme Corporation', 'New York', '555-1234', 'John Smith'),
    new Customer(2, 'Globex Industries', 'London', '555-5678', 'Jane Doe'),
    new Customer(
      3,
      'Initech Solutions',
      'San Francisco',
      '555-9012',
      'Alice Johnson'
    ),
    new Customer(4, 'TechCo Ltd.', 'Tokyo', '555-3456', 'Bob Thompson'),
    new Customer(5, 'MegaCorp Inc.', 'Sydney', '555-7890', 'Eva Davis'),
  ];

  getCustomers(): Customer[] {
    return this.customers;
  }

  deleteCustomer(customer: Customer): void {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.customers.splice(index, 1);
    }
  }
}
