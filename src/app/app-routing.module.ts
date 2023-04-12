import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresa', component: CompanyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
