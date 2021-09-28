import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'register',
        component: RegisterComponent
      }
    ])
  ]
})
export class RegisterModule { }
