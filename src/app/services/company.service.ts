import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/companies`;

  searchCompany(term: String): Observable<Company[]> {
    const url = `${this.apiUrl}/company/${term}`;

    return this.http.get<Company[]>(url);
  }

  findAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompany(id: Number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Company>(url);
  }

  constructor(private http: HttpClient) {}
}
