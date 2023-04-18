import { Component } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  term!: string;

  companySearch: Company[] = [];

  search() {
    this.companyService.searchCompany(this.term).subscribe((items) => {
      this.companySearch = items;
    });
  }

  constructor(private companyService: CompanyService) {}
}
