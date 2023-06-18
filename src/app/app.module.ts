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
import { MaterialCostListComponent } from './material/material-cost-list/material-cost-list.component';
import { MaterialCostDetailComponent } from './material/material-cost-detail/material-cost-detail.component';
import { LaborCostListComponent } from './labor/labor-cost-list/labor-cost-list.component';
import { LaborCostDetailComponent } from './labor/labor-cost-detail/labor-cost-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'job/history', component: JobHistoryComponent },
  { path: 'job', redirectTo: 'job/history', pathMatch: 'full' },
  { path: 'job/new', component: AddJobComponent },
  { path: 'job/:jobId', component: JobDetailComponent },
  {
    path: 'job/:jobId/material/:matId/costs',
    component: MaterialCostListComponent,
  },
  { path: 'job/:jobId/labor/:labId/costs', component: LaborCostListComponent },
  {
    path: 'job/:jobId/labor/:labId/costs/new',
    component: LaborCostDetailComponent,
  },
  {
    path: 'job/:jobId/material/:matId/costs/:dmId',
    component: MaterialCostDetailComponent,
  },
  {
    path: 'job/:jobId/material/:matId/costs/new',
    component: MaterialCostDetailComponent,
  },
  {
    path: 'job/:jobId/labor/:labId/costs/:dlId',
    component: LaborCostDetailComponent,
  },
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/list/:customerId', component: CustomerDetailComponent },
  { path: 'customer/new', component: CustomerDetailComponent },
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
    MaterialCostListComponent,
    MaterialCostDetailComponent,
    LaborCostListComponent,
    LaborCostDetailComponent,
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
