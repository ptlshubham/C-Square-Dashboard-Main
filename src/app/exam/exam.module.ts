import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ExamComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'exam',
        component:ExamComponent
      }
    ])
  ]
})
export class ExamModule { }
