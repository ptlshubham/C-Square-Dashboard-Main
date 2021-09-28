import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { AdminforgotComponent } from './adminforgot/adminforgot.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        AdminloginComponent,
        ForgotpwdComponent,
        AdminforgotComponent,
    ]
})

export class PagesModule { }
