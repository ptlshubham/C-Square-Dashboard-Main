import { Routes } from "@angular/router";
import { ManagequeComponent } from "./manageque/manageque.component";
import { VisitorexamComponent } from "./visitorexam/visitorexam.component";
import { VisitorlistComponent } from "./visitorlist/visitorlist.component";
import { VisitorregComponent } from "./visitorreg/visitorreg.component";


export const VisitorRoutes: Routes = [{
    path: '',
    children: [{
        path: 'visitorreg',
        component: VisitorregComponent
    }]
}, {
    path: '',
    children: [{
        path: 'manageque',
        component: ManagequeComponent
    }]
}, {
    path: '',
    children: [{
        path: 'visitorexam',
        component: VisitorexamComponent
    }]
},
{
    path: '',
    children: [{
        path: 'visitorlist',
        component: VisitorlistComponent
    }]
},

];
