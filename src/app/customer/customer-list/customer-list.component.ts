import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from './../customer.service';
import { Component, ChangeDetectorRef } from '@angular/core';
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
    this.customerService
      .getCustomers()
      .subscribe((result: Customer[]) => (this.customers = result));
  }
  editCustomer(customer: Customer) {
    this.router.navigate(['/customer/list', customer.id]);
  }

  deleteCustomer(customer: Customer) {
    // Handle delete action
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customers = this.customers.filter((c) => c.id != customer.id);
        this.customerService.deleteCustomer(customer).subscribe();
      }
    });
  }

  addCustomer() {
    this.router.navigate(['/customer/list/new']);
  }

  goBack(): void {
    this.location.back();
  }
}
