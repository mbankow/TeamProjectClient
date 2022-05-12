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

  public getById(projectId: number): Observable<ProjectDTO>{
    return this.http.get<ProjectDTO>(`${this.apiServerUrl}/project/${projectId}`)
  }

  public save(project: ProjectDTO): Observable<ProjectDTO>{
    return this.http.post<ProjectDTO>(`${this.apiServerUrl}/project`, project)
  }

  public update(project: ProjectDTO): Observable<ProjectDTO>{
    return this.http.put<ProjectDTO>(`${this.apiServerUrl}/project`, project)
  }

  public delete(projectId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/project/${projectId}`)
  }
}
