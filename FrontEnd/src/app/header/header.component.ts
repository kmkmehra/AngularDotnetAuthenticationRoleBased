import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public userAuthService: UserAuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
   //this.isLoggedIn = this.userAuthService.checkUserLoggedIn();
  }
  //public isLoggedIn:boolean = false;
  public checkUserLoggedIn() : boolean {
    return this.userAuthService.checkUserLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

}
