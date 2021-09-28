import { Routes } from "@angular/router";
import { StandardComponent } from "./standard/standard.component";
import { SubjectComponent } from "./subject/subject.component";

export const ManageRoutes: Routes = [{
    path: '',
    children: [{
        path: 'std',
        component: StandardComponent
    }]
},{
    path: '',
    children: [{
        path: 'subject',
        component: SubjectComponent
    }]
},

];
