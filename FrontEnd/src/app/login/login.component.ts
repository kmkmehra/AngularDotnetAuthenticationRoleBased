import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  login(formData: any) {
    // var loginObj: any = {
    //   Username: 'admin',
    //   Password: '1234567',
    // };

    this.userService.adminLogin(formData).subscribe(
      (response: any) => {
        debugger;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
