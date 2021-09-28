import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'question',
        component: QuestionComponent
      }
    ])
  ]
})
export class QuestionModule { }
