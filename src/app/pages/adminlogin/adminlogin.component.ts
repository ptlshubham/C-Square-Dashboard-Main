import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Loginuser } from '../login/login.model';
import { LoginService } from '../login/login.service';
declare var $: any;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  role: any = [];
  selectedRole: any;
  loginForm: FormGroup;
  public loginModel: Loginuser[] = [];
  account_validation_messages = {
      'email': [
          { type: 'required', message: 'Email is required' },
          { type: 'pattern', message: 'Enter a valid email' }
      ],
  }
  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private router: Router,

    private element: ElementRef,
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
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
    body.classList.add('login-page');
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700)
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
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

  login(credentials) {
     
    console.log("......data...." + credentials.email);
    credentials.role = 'admin';
     
    this.loginService.login(credentials).subscribe(data => {
      if (data == 1) {
        this.apiService.showNotification('top', 'right', 'Wrong Email!', 'danger');
      }
      else if (data == 2) {

        this.apiService.showNotification('top', 'right', 'Wrong Password!', 'danger');

      }
      else {
        this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
        localStorage.setItem('authenticationAdminToken', data[0].token);
        localStorage.setItem('AdminId', data[0].id);
        localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
        localStorage.setItem('role', 'Admin');
        this.router.navigate(['dashboard']);
      }

    });
  }

}
