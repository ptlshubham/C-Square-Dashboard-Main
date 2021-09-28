import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import { RouterModule } from '@angular/router';
import { BannersRoutes } from './banners.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BannersRoutes),
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class BannersModule { }
