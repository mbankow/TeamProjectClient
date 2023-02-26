import { Injectable } from '@angular/core';
import { UserDTO } from '../models/user-dto';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
const TOKEN_KEY = 'auth-token';
const LOGGED_USER_EMAIL = 'logged-user-email';
const LOGGED_USER_ROLE = 'user-role'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private userService: UserService) { }
  user!: UserDTO;
  decodedToken:any;

  logOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(LOGGED_USER_EMAIL);
    window.sessionStorage.removeItem(LOGGED_USER_ROLE);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.getUser(token);
    window.sessionStorage.setItem(LOGGED_USER_EMAIL, this.user.email);
    window.sessionStorage.setItem(LOGGED_USER_ROLE, this.user.role);

  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getLoggedUserEmail(): string | null{
    return window.sessionStorage.getItem(LOGGED_USER_EMAIL);
  }

  public getLoggedUserRole(): string | null{
    return window.sessionStorage.getItem(LOGGED_USER_ROLE);
  }

  getUser(token:string){
    this.decodedToken = this.decodeToken(token);
    this.userService.getByEmail(this.decodedToken.sub).subscribe( (response: UserDTO) =>{
      this.user = response;
    })
  }

  decodeToken(token: string): any{
    try{
     return jwt_decode(token);
    }
    catch{
      return null;
    }
  }
}


