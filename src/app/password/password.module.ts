import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordRoutes } from './password.routing';



@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PasswordRoutes)
  ]
})
export class PasswordModule { }
