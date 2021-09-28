import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationRoutes } from './notification.routing';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(NotificationRoutes)
  ]
})
export class NotificationModule { }
