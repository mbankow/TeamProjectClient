import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { ProjectDTO } from 'src/app/models/project-dto';
import { ProjectService } from 'src/app/service/project.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleName } from 'src/app/models/enums/role-name';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { UserDTO } from 'src/app/models/user-dto';

@Component({
  selector: 'app-tables-project',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableProjectComponent implements OnInit {


  constructor(private projectService: ProjectService,public dialog:MatDialog,private snackBar: MatSnackBar,
              private tokenStorage: TokenStorageService, private userService: UserService) { }
  ngOnInit(): void {
    this.getProjects(this.page);
    this.getUserByEmail();
  }


  displayedColumns: string[] = ['position', 'name', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ProjectDTO>();
  public projects: ProjectDTO[] = [];
  isMentor : boolean = true;
  isStudent : boolean = false;
  page:number = 1;
  userRole:any = this.tokenStorage.getLoggedUserRole();
  userEmail: any = this.tokenStorage.getLoggedUserEmail();
  public projects2: ProjectDTO[] = [];
  public routes: typeof routes = routes;
  user!: UserDTO;

  public getProjects(page: number): void {
    this.projectService.get(page).subscribe({
      next:(response: ProjectDTO[]) => {
        this.projects = response
      },
        error: (error: HttpErrorResponse) => alert(error.message)
      }
    )
  }

  getUserByEmail(){
    this.userService.getByEmail(this.userEmail).subscribe({
      next:(response: UserDTO)=>{
          this.user = response;
          this.setTable();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  setTable(){
    if(this.userRole == RoleName.MENTOR){
      this.displayedColumns = ['position', 'name', 'description', 'edit', 'delete'];
      this.getProjectFromUser();
      this.isStudent = false;
      this.isMentor = true;
    }
    else if(this.userRole == RoleName.STUDENT) {
      this.displayedColumns = ['position', 'name', 'description', 'firm'];
      this.dataSource.data = this.projects;
      this.isMentor = false;
      this.isStudent = true;
    }
    else if(this.userRole == RoleName.ADMIN) {
      this.displayedColumns = ['position', 'name', 'description', 'edit', 'delete'];
      this.dataSource.data = this.projects;
      this.isMentor = false;
      this.isStudent = true;
    }
  }

  getProjectFromUser(){
    if(this.user?.projects != undefined && this.user?.projects != null){
      this.dataSource.data = this.user.projects;
    }else{
      this.dataSource.data = [];
    }
  }

  public deleteProject(project: ProjectDTO){
    let dialogRef = this.dialog.open(DialogDeleteComponent,{data:{message:'Czy na pewno usunąć projekt?', confirmation:'Usuń'}});
    console.log(project.id);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.projectService.delete(project.id).subscribe({
            next:(response:void)=>{
              this.getProjects(this.page),
              this.openSnackBar("Projekt został pomyślnie usunięty.")},
            error:(error:HttpErrorResponse)=>
              alert(error.message)
            }
          );
        }
      })
  }

  openSnackBar(message: string = "Projekt został pomyślnie usunięty."): void {
    this.snackBar.open(message, "X");
  }
}
