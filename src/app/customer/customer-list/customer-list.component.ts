import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from './../customer.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}
  pageTitle: string = 'customers';
  customers: Customer[] = [];

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
  }
  editCustomer(customer: Customer) {
    this.router.navigate(['/customer/list', customer.id]);
  }

  deleteCustomer(customer: Customer) {
    // Handle delete action
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.deleteCustomer(customer);
      }
    });
  }

  addCustomer() {
    this.router.navigate(['/customer/new']);
  }

  goBack(): void {
    this.location.back();
  }
}
