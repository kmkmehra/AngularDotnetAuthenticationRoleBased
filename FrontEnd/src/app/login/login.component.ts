import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(formData: any) {
    this.userService.adminLogin(formData).subscribe(
      (response: any) => {
        let { token, data, status } = response;
        let { role, name } = data;
        // setting local storage
      this.userAuthService.setRoles([role]);
        this.userAuthService.setUser(data);
        this.userAuthService.setToken(token);

        if (role.toUpperCase() === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
