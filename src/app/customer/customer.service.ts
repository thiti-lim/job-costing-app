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

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  deleteCustomer(customer: Customer): void {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.customers.splice(index, 1);
    }
  }

  addCustomer(
    name: string,
    location: string,
    contact: string,
    phoneNumber: string
  ): void {
    const maxId = Math.max(...this.customers.map((customer) => customer.id));
    this.customers.push(
      new Customer(maxId + 1, name, location, contact, phoneNumber)
    );
  }
  updateCustomer(updatedCustomer: Customer): void {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id
    );
    if (index > -1) {
      this.customers[index] = updatedCustomer;
    }
  }
}
