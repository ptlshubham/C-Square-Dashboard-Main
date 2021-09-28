import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestlistComponent } from './testlist.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestlistRoutes } from './testlist.routing';



@NgModule({
  declarations: [TestlistComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TestlistRoutes)
  ]
})
export class TestlistModule { }
