import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  PATH_OF_API = 'https://localhost:7297/api';

  public adminLogin(param:any) {
    var headers:any={}; 
    return this.httpClient.post(this.PATH_OF_API + '/Authentication/Login', param, headers);
  }

  
}
