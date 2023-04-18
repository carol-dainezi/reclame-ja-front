import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresa/:id', component: CompanyPageComponent },
  {
    path: 'empresa/:companyId/reclamacao/:ticketId',
    component: TicketPageComponent,
  },
  { path: 'empresa/:companyId/reclamar', component: TicketFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
