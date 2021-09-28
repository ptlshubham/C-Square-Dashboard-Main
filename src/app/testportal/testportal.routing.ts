import { Routes } from '@angular/router';
import { TestportalComponent } from './testportal.component';


export const TestportalRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'testportal',
      component: TestportalComponent
  }]
}];