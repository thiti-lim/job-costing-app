import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: Customer[] = [
    new Customer(1, 'ABC Corporation', 'New York', 'John Doe', '0123456789'),
    new Customer(2, 'XYZ Industries', 'London', 'Jane Smith', '0987654321'),
    new Customer(3, 'Smith & Co.', 'Paris', 'Mike Johnson', '0123456798'),
    new Customer(4, 'Acme Ltd.', 'Tokyo', 'Sarah Lee', '0678901234'),
    new Customer(5, 'Global Ventures', 'Berlin', 'Robert Brown', '0897654321'),
  ];
  nextId = 6;

  getCustomers(): Customer[] {
    return this.customers;
  }

  deleteCustomer(customer: Customer): void {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.customers.splice(index, 1);
    }
  }

  addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }
}