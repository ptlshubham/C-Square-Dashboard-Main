import { Routes } from '@angular/router';
import { TestlistComponent } from './testlist.component';


export const TestlistRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: TestlistComponent
    }]
}];
