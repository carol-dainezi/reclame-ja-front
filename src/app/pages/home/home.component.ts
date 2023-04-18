import { Component } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  companies: Company[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.findAllCompanies().subscribe((items) => {
      this.companies = items;
      console.log(items);
    });
  }
}
