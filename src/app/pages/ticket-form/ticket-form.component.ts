import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Company } from 'src/app/interfaces/company';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent {
  company!: Company;
  ticketForm!: FormGroup;

  submit() {
    if (this.ticketForm.invalid) {
      return;
    } else {
      this.clientService
        .findClientByCpf(this.ticketForm.get('client')!.value)
        .subscribe((item) => {
          this.ticketForm.patchValue({
            client: item,
            cnpj: this.company.cnpj,
            creationDate: this.datePipe.transform(
              new Date(),
              'yyyy-MM-dd HH:mm:ss'
            ),
          });

          this.ticketService
            .saveTicket(this.ticketForm.value)
            .subscribe((item) => {
              this.router.navigate([
                `/empresa/${this.company.id}/reclamacao/${item.id}`,
              ]);
            });
        });
    }
  }

  constructor(
    private ticketService: TicketService,
    private companyService: CompanyService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.companyService.getCompany(param['companyId']).subscribe((item) => {
        this.company = item;
      });
    });

    this.ticketForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      cnpj: new FormControl(''),
      creationDate: new FormControl(''),
      client: new FormControl(''),
    });
  }
}
