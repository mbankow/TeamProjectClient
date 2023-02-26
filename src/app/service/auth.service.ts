import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDTO } from '../models/project-dto';
import { UserDTO } from '../models/user-dto';

const AUTH_API = 'http://localhost:8080/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http: HttpClient) { }
  private apiServerUrl = environment.apiBaseUrl;

  public login(user: UserDTO): Observable<any>{
    return this.http.post(`${AUTH_API}/signin`, user, httpOptions);
  }

  public register(user: UserDTO): Observable<any>{
    return this.http.post(`${AUTH_API}/signup`, user, httpOptions);
  }

}
