import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  JWT_KEY: string = 'JWT_TOKEN';
  ROLE_KEY: string = 'ROLES';
  USER_KEY: string = 'USER';

  public setRoles(roles: Array<string>) {
    localStorage.setItem(this.ROLE_KEY, JSON.stringify(roles));
  }

  public getRoles(): Array<string> {
    let result = localStorage.getItem(this.ROLE_KEY);
    if (result) return JSON.parse(result);
    return [];
  }

  public setUser(user: {}) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // union type return function
  public getUser(): {} | null {
    let result = localStorage.getItem(this.USER_KEY);
    if (result) return JSON.parse(result);
    return null;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem(this.JWT_KEY, jwtToken);
  }

  // union type return function
  public getToken(): string | null {
    return localStorage.getItem(this.JWT_KEY);
  }

  // logout
  public clear() {
    localStorage.clear();
  }

  public checkUserLoggedIn(): boolean {
    return this.getRoles().length > 0 && this.getToken() ? true : false;
  }

  public hasRoleAccess(allowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles();
    if (userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].toUpperCase() === allowedRoles[j].toUpperCase()) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return false;
  }
}
