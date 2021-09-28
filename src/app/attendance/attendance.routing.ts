import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';


export const AttendanceRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'attendance',
      component: AttendanceComponent
  }]
}];