import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from './../customer.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}
  pageTitle: string = 'customers';
  customers: Customer[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'phoneNumber',
    'contact',
    'actions',
  ];

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
  }
  editCustomer(customer: Customer) {
    // Handle edit action
    console.log('Editing customer:', customer);
  }

  deleteCustomer(customer: Customer) {
    // Handle delete action
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.customerService.deleteCustomer(customer);
    });
    this.customers = this.customerService.getCustomers();
  }
}
