import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { FormsModule } from '@angular/forms';
import { AttendanceRoutes } from './attendance.routing';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forChild(AttendanceRoutes),
  ]
})
export class AttendanceModule { }
