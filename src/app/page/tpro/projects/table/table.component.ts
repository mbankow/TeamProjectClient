import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { ProjectDTO } from 'src/app/models/project-dto';
import { ProjectService } from 'src/app/service/project.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-tables-page',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,public dialog:MatDialog) { }
  ngOnInit(): void {
    this.getProjects(1);
  }

  displayedColumns: string[] = ['position', 'name', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ProjectDTO>();
  public projects!: ProjectDTO[];
  public routes: typeof routes = routes;

  public getProjects(page: number): void {
    this.projectService.get(page).subscribe({
      next:(response: ProjectDTO[]) => {
        this.projects = response;
        this.dataSource.data = response;
        console.log(this.projects)},
        error: (error: HttpErrorResponse) => alert(error.message)
      }
    )
  }

  public deleteContract(project: ProjectDTO){
    let dialogRef = this.dialog.open(DialogDeleteComponent,{});
    console.log(project.id);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.projectService.delete(project.id).subscribe({
            next:(response:void)=>
              this.getProjects(1),
            error:(error:HttpErrorResponse)=>
              alert(error.message)
            }
          );
        }
      })
  }
}
