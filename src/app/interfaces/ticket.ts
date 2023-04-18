import { Answer } from './answer';
import { Client } from './client';

export interface Ticket {
  id?: Number;
  title: String;
  content: String;
  reason: String;
  cnpj: String;
  status: String;
  creationDate: Date;
  client: Client;
}
