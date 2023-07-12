import { Customer } from 'src/app/models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, ObservedValueOf, tap } from 'rxjs';
import { protectedResources } from '../auth-config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  private path = 'customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.path}`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/${this.path}/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer[]> {
    console.log(customer);
    return this.http.post<Customer[]>(
      `${environment.apiUrl}/${this.path}`,
      customer
    );
  }
  updateCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(
      `${environment.apiUrl}/${this.path}`,
      customer
    );
  }

  deleteCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.delete<Customer[]>(
      `${environment.apiUrl}/${this.path}/${customer.id}`
    );
  }
}
