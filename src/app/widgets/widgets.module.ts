import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavheaderComponent } from './navheader/navheader.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressRouterModule
  ],
  declarations: [NavheaderComponent],
  exports: [NavheaderComponent]
})
export class WidgetsModule { }
