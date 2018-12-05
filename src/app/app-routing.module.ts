import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { CountryViewComponent } from './public/country-view/country-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
    { path:'country/:countryCode', component: CountryViewComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
