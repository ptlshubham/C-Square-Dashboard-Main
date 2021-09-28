import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardComponent } from './standard/standard.component';
import { ManageRoutes } from './manage.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';



@NgModule({
  declarations: [StandardComponent, SubjectComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    RouterModule.forChild(ManageRoutes),
  ]
})
export class ManageModule { }
