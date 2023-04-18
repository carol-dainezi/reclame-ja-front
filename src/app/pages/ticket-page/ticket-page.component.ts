import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/interfaces/answer';
import { Company } from 'src/app/interfaces/company';
import { Ticket } from 'src/app/interfaces/ticket';
import { AnswerService } from 'src/app/services/answer.service';
import { CompanyService } from 'src/app/services/company.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css'],
})
export class TicketPageComponent {
  answerForm!: FormGroup;

  answers: Answer[] = [];
  ticket!: Ticket;
  company!: Company;

  getCompany(id: Number) {
    this.companyService.getCompany(id).subscribe((item) => {
      this.company = item;
    });
  }

  getTicketAnswers(id: Number) {
    this.answerService.getTicketAnswers(id).subscribe((items) => {
      this.answers = items;
    });
  }

  submit() {
    if (this.answerForm.invalid) {
      console.log('Form inválido');
      return;
    } else {
      this.answerForm.patchValue({
        creationDate: this.datePipe.transform(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        ),
        ticket: { id: this.ticket.id },
      });

      this.answerService.saveAnswer(this.answerForm.value).subscribe();
      window.location.reload();
    }
  }

  rateResolved() {
    this.ticket.status = 'RATED_RESOLVED';

    this.ticketService.editTicket(this.ticket).subscribe();
  }

  rateNotResolved() {
    this.ticket.status = 'RATED_UNRESOLVED';

    this.ticketService.editTicket(this.ticket).subscribe();
  }

  constructor(
    private answerService: AnswerService,
    private ticketService: TicketService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.ticketService.getTicket(param['ticketId']).subscribe((item) => {
        this.ticket = {
          id: item.id,
          title: item.title,
          content: item.content,
          reason: item.reason,
          status: item.status,
          cnpj: item.cnpj,
          creationDate: item.creationDate,
          client: item.client,
        };

        this.getTicketAnswers(item.id!);
      });
    });

    this.route.params.subscribe((param) => {
      this.getCompany(param['companyId']);
    });

    this.answerForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
      creationDate: new FormControl(''),
      is_company: new FormControl(false),
      ticket: new FormControl(''),
    });
  }
}
