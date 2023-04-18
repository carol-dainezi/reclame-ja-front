import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/tickets`;

  getTicket(id: Number): Observable<Ticket> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Ticket>(url);
  }

  getCompanyTickets(cnpj: String): Observable<Ticket[]> {
    const url = `${this.apiUrl}/company/${cnpj}`;

    return this.http.get<Ticket[]>(url);
  }

  saveTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  editTicket(ticket: Ticket): Observable<Ticket> {
    const url = `${this.apiUrl}/${ticket.id}`;

    return this.http.put<Ticket>(url, ticket);
  }

  constructor(private http: HttpClient) {}
}
