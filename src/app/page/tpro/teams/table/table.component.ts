import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { RoleName } from 'src/app/models/enums/role-name';
import { TeamDTO } from 'src/app/models/team-dto';
import { UserDTO } from 'src/app/models/user-dto';
import { TeamService } from 'src/app/service/team.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-table-team',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableTeamComponent implements OnInit {

  constructor(private teamService: TeamService,public dialog:MatDialog, private tokenStorage: TokenStorageService,
              private userService: UserService) { }
  ngOnInit(): void {
    this.getTeams(this.page);
    //this.dataSource.data = this.teams2;
    this.getUserByEmail(this.userEmail);
    this.setTable();
    this.groupMembers();
  }



  dataSource = new MatTableDataSource<TeamDTO>();
  dataSource2 = new MatTableDataSource<UserDTO>();
  public teams: TeamDTO[] = [];
  public routes: typeof routes = routes;
  isAdmin : boolean = false;
  isStudent : boolean = true;
  teamIsFull: boolean = false;
  isAssignedToTeam: boolean = false;
  page:number = 2;
  user!: UserDTO;
  displayedColumns: string[] = [];
  displayedColumns2: string[] = ['name', 'lastName'];
  userRole:any = this.tokenStorage.getLoggedUserRole();
  userEmail:any = this.tokenStorage.getLoggedUserEmail();
  public teams2: TeamDTO[] = [
    {
      id: 1,
      name: 'Programisci',
      students: [],
      choices: '1.Komiko,2.Regent,3.Visimind'
    },
    {
      id: 2,
      name: 'Plenty',
      students: [],
      choices: '1.Komiko,2.Visimind,3.Regent'
    },
    {
      id: 3,
      name: 'Kodersi',
      students: [],
      choices: '1.Visimind,2.Regent,3.Komiko'
    },
    {
      id: 4,
      name: 'CodeSweepers',
      students: [],
      choices: '1.Regent,2.Komiko,3.Visimind'
    },
    {
      id: 5,
      name: 'Codemind',
      students: [],
      choices: '1.Visimind,2.Komiko,3.Regent'
    }
    // {
    //   id: 6,
    //   name: 'FCKeyboard',
    //   students: [],
    //   choices: '1.Komiko,2.Regent,3.Visimind'
    // },
    // {
    //   id: 7,
    //   name: 'BigDrop',
    //   students: [],
    //   choices: '1.Regent,2.Komiko,3.Visimind'
    // },
  ];
  public team!: TeamDTO | null;
  setTable(){
    if(this.userRole === RoleName.ADMIN){
      this.displayedColumns = ['position', 'name', 'edit', 'delete'];
      this.isStudent = false;
      this.isAdmin = true;
    }
    else if(this.userRole === RoleName.STUDENT){
      this.displayedColumns = ['position', 'name', 'join'];
      this.isAdmin = false;
      this.isStudent = true;
    }
  }
  public getTeams(page: number): void {
    this.teamService.get(page).subscribe({
      next:(response: TeamDTO[]) => {
        this.teams = response;
        this.dataSource.data = response;
        },
        error: (error: HttpErrorResponse) => alert(error.message)
      }
    )
  }

  getUserByEmail(email:string){
    this.userService.getByEmail(email).subscribe({
      next:(response:UserDTO) => {
        console.log(response);
        this.user = response,
        this.groupMemberCheck();
      },
      error: (error: HttpErrorResponse)=> {alert(error.message)}
    })
  }

  groupMemberCheck(){
    if(this.user.teamAffilation != null && this.user.teamAffilation != undefined){
      this.isAssignedToTeam = true;
      this.team = this.user.teamAffilation;
      this.dataSource2.data = this.team.students;
    }
  }

  enterGroup(team: TeamDTO){
    this.user.teamAffilation = team;
    this.userService.update(this.user).subscribe({
      next:(response)=>{
        window.location.reload();
      },
      error:(error:HttpErrorResponse) =>{
          alert(error.message)
      }
    })
  }
  public deleteTeam(team: TeamDTO){
    let dialogRef = this.dialog.open(DialogDeleteComponent,{});
    console.log(team.id);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.teamService.delete(team.id).subscribe({
            next:(response:void)=>
              this.getTeams(this.page),
            error:(error:HttpErrorResponse)=>
              alert(error.message)
            }
          );
        }
      })
  }

  public updateTeam(): void {
    let dialogRef = this.dialog.open(DialogDeleteComponent,{data:{message:'Czy chcesz opuścić grupę?', confirmation:'Opuść'}});
    //this.deleteStudent(this.user.id);
    this.user.teamAffilation = null;
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.userService.update(this.user).subscribe({
          next:(response) => {
            this.getTeams(this.page),
            this.isAssignedToTeam = false
            window.location.reload();
          },
          error:(error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
      }
    })
  }

  groupMembers(){
    if(this.isAssignedToTeam){
      console.log("Uzytkownik nalezy do grupy")
      console.log(this.user.teamAffilation);
      this.team = this.user.teamAffilation;
      this.dataSource2.data = this.team!.students;
    }
  }

  deleteStudent(id:number){
    console.log("Student opuszczajcy grupe");
    console.log(this.team!.students.findIndex(item => item.id === id));
    this.team!.students.splice(this.team!.students.findIndex(item => item.id === id),1);
  }
}
