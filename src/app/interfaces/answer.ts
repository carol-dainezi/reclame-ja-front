import { Ticket } from './ticket';

export interface Answer {
  id?: Number;
  message: String;
  creationDate: Date;
  is_company: Boolean;
  ticket: Ticket;
}
