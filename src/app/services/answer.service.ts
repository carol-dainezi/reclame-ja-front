import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/answers`;

  getTicketAnswers(ticketId: Number): Observable<Answer[]> {
    const url = `${this.apiUrl}/ticket/${ticketId}`;

    return this.http.get<Answer[]>(url);
  }

  saveAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl, answer);
  }

  constructor(private http: HttpClient) {}
}
