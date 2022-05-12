import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamDTO } from '../models/team-dto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public get(pageNumber: number): Observable<TeamDTO[]>{
    return this.http.get<TeamDTO[]>(`${this.apiServerUrl}/team?page=${pageNumber}`)
  }

  public getById(teamId: number): Observable<TeamDTO>{
    return this.http.get<TeamDTO>(`${this.apiServerUrl}/team/${teamId}`)
  }

  public save(team: TeamDTO): Observable<TeamDTO>{
    return this.http.post<TeamDTO>(`${this.apiServerUrl}/team`, team)
  }

  public update(team: TeamDTO): Observable<TeamDTO>{
    return this.http.put<TeamDTO>(`${this.apiServerUrl}/team`, team)
  }

  public delete(teamId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/team/${teamId}`)
  }
}
