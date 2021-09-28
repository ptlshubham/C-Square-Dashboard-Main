import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { data } from 'jquery';
import { LoginService } from '../login/login.service';
import { ForgotPwd } from './forgotpwd.model';
declare var $: any;

@Component({
    selector: 'app-forgotpwd',
    templateUrl: './forgotpwd.component.html',
    styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {
    test: Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public forgotPwdModel: ForgotPwd = new ForgotPwd;
    forgotBox: boolean = false;
    changePwd: boolean = false;
    otpBox: boolean = false;

    emailResp: any;
    otpResp: any;
    role: any = [];
    selectedRole: string = '';
    constructor(
        private element: ElementRef,
        private loginService: LoginService,
        private apiService: ApiService,
        private router: Router
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.role = [
            {
                name: 'Teacher'
            },
            {
                name: 'Student',
            },

        ]
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('lock-page');

        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('lock-page');
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    selectRole(name) {
        this.role.forEach(element => {
            if (element.name == name) {
                this.selectedRole = element.name;
            }
        })

    }
    forgotPassword() {
        this.forgotPwdModel.role = this.selectedRole;
        this.loginService.forgotPwd(this.forgotPwdModel).subscribe((data) => {
            this.apiService.showNotification('top', 'right', 'Email Sent Successfully on your Email Address.', 'success');
            this.emailResp = data[0].id;

            this.forgotBox = true;
            this.changePwd = false;
            this.otpBox = true;
        });
    }
    saveOTP() {
        this.forgotPwdModel.id = this.emailResp;

        this.loginService.getOneTimePwd(this.forgotPwdModel).subscribe((data) => {

            this.otpResp = data[0].userid;
            this.changePwd = true;
            this.otpBox = false;
            this.forgotBox = true
        });
    }
    changeForgotPwd() {
        this.forgotPwdModel.id = this.otpResp;

        this.loginService.updatePassword(this.forgotPwdModel).subscribe((req) => {
            this.apiService.showNotification('top', 'right', 'Password changed Successfully.', 'success');
            this.router.navigate(['/pages/login']);
        })

    }
}
