import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.baseApiUrl}/clients`;

  findClientByCpf(cpf: String): Observable<Client> {
    const url = `${this.apiUrl}/cpf/${cpf}`;

    return this.http.get<Client>(url);
  }

  constructor(private http: HttpClient) {}
}
