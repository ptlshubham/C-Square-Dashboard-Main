import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorregComponent } from './visitorreg/visitorreg.component';
import { RouterModule } from '@angular/router';
import { VisitorRoutes } from './visitor.routing';
import { ManagequeComponent } from './manageque/manageque.component';
import { FormsModule } from '@angular/forms';
import { VisitorexamComponent } from './visitorexam/visitorexam.component';
import { VisitorlistComponent } from './visitorlist/visitorlist.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [VisitorregComponent, ManagequeComponent, VisitorexamComponent, VisitorlistComponent],

  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(VisitorRoutes),
  ]
})
export class VisitorModule { }
