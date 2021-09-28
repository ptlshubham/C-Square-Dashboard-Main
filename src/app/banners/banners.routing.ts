import { Routes } from '@angular/router';
import { BannersComponent } from './banners.component';


export const BannersRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'banners',
      component: BannersComponent
  }]
}];