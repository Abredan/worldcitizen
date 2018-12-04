import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavheaderComponent } from './navheader/navheader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavheaderComponent],
  exports: [NavheaderComponent]
})
export class WidgetsModule { }
