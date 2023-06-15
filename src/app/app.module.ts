import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './components/material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { JobHistoryComponent } from './job/job-history/job-history.component';
import { AddJobComponent } from './job/add-job/add-job.component';
import { JobDetailComponent } from './job/job-detail/job-detail.component';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'job/history', component: JobHistoryComponent },
  { path: 'job', redirectTo: 'job/history', pathMatch: 'full' },
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/list/:id', component: CustomerDetailComponent },
  { path: 'customer/new', component: CustomerDetailComponent },
  { path: 'customer', redirectTo: 'customer/list', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    JobHistoryComponent,
    AddJobComponent,
    JobDetailComponent,
    HomeComponent,
    CustomerListComponent,
    DeleteDialogComponent,
    CustomerDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
