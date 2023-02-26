import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public get(pageNumber: number): Observable<any>{
    return this.http.get<UserDTO[]>(`${this.apiServerUrl}/user?page=${pageNumber}`)
  }

  public getByEmail(userEmail: string): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.apiServerUrl}/user/${userEmail}`)
  }

  public save(user: UserDTO): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${this.apiServerUrl}/user`, user)
  }

  public update(user: UserDTO): Observable<UserDTO>{
    return this.http.put<UserDTO>(`${this.apiServerUrl}/user`, user)
  }

  public delete(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/${userId}`)
  }
}
