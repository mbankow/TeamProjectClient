import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDTO } from '../models/project-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public get(pageNumber: number): Observable<ProjectDTO[]>{
    return this.http.get<ProjectDTO[]>(`${this.apiServerUrl}/project?page=${pageNumber}`)
  }

  public getById(contactId: number): Observable<ProjectDTO>{
    return this.http.get<ProjectDTO>(`${this.apiServerUrl}/project/${contactId}`)
  }

  public save(contact: ProjectDTO): Observable<ProjectDTO>{
    return this.http.post<ProjectDTO>(`${this.apiServerUrl}/project`, contact)
  }

  public update(contact: ProjectDTO): Observable<ProjectDTO>{
    return this.http.put<ProjectDTO>(`${this.apiServerUrl}/project`, contact)
  }

  public delete(contactId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/project/${contactId}`)
  }
}
