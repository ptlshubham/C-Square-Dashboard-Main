import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
},
{
    path: '',
    component: AdminLayoutComponent,
    children:
        [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './banners/banners.module#BannersModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './testportal/testportal.module#TestportalModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'password',
                loadChildren: './password/password.module#PasswordModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './notification/notification.module#NotificationModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './attendance/attendance.module#AttendanceModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'manage',
                loadChildren: './manage/manage.module#ManageModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'visitor',
                loadChildren: './visitor/visitor.module#VisitorModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'question',
                loadChildren: './question/question.module#QuestionModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './exam/exam.module#ExamModule',
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: './register/register.module#RegisterModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'testlist',
                loadChildren: './testlist/testlist.module#TestlistModule',
                canActivate: [AuthGuard]
            },


        ]
},
{
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
       
    }]
}
];
