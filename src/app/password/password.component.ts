import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { ForgotPwd } from 'app/pages/forgotpwd/forgotpwd.model';
import { LoginService } from 'app/pages/login/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  oldpass: boolean = false;
  public forgotPwdModel: ForgotPwd = new ForgotPwd;
  constructor(
    private manageservice: ManageService,
    private loginService: LoginService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  focusOutFunction(val) {
    debugger
    let data = {
      id: localStorage.getItem('AdminId'),
      pass: val,
      role: localStorage.getItem('role')
    }
    this.manageservice.CheckPassword(data).subscribe((res: any) => {
      if (res.length >= 1) {
        this.oldpass = false;
      }
      else {
        this.oldpass = true;
      }
    })
  }
  CompareFunction(cnfpass) {
    debugger
  }
  updatePasword(val) {
    if (localStorage.getItem('role') == 'Teacher' || localStorage.getItem('role') == 'Student') {
      let data = {
        id: localStorage.getItem('UserId'),
        role: localStorage.getItem('role'),
        password: val
      };
      this.loginService.changePassword(data).subscribe((req) => {
        localStorage.clear();
        this.apiService.showNotification('top', 'right', 'Password changed Successfully. Login with new Password', 'success');
        this.router.navigate(['/pages/login']);
      })
    } else {
      let data = {
        id: localStorage.getItem('AdminId'),
        role: localStorage.getItem('role'),
        password: val
      };
      this.loginService.changePassword(data).subscribe((req) => {
        localStorage.clear();
        this.apiService.showNotification('top', 'right', 'Password changed Successfully. Login with new Password', 'success');
        this.router.navigate(['/pages/login']);
      })
    }


    debugger

  }
}
