import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Ticket } from 'src/app/interfaces/ticket';
import { CompanyService } from 'src/app/services/company.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
})
export class CompanyPageComponent {
  company!: Company;
  companyTickets: Ticket[] = [];

  getAllTickets() {
    this.ticketService
      .getCompanyTickets(this.company.cnpj)
      .subscribe((items) => {
        this.companyTickets = items;
      });
  }

  constructor(
    private companyService: CompanyService,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.companyService.getCompany(param['id']).subscribe((item) => {
        this.company = item;

        this.getAllTickets();
      });
    });
  }
}
