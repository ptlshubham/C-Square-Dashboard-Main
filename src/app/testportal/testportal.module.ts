import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestportalComponent } from './testportal.component';
import { RouterModule } from '@angular/router';
import { TestportalRoutes } from './testportal.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TestportalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TestportalRoutes),
    FormsModule,
  ]
})
export class TestportalModule { }
