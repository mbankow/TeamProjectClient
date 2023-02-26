import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { routes } from 'src/app/consts';
import { UserDTO } from 'src/app/models/user-dto';
import { RoleName } from 'src/app/models/enums/role-name';
import { MatTableDataSource } from '@angular/material/table';
import { TeamDTO } from 'src/app/models/team-dto';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-view-user',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }
  public user!: UserDTO;
  public routes: typeof routes = routes;
  isMentor: boolean = false;
  memberOfTeam: boolean = false;
  dataSource = new MatTableDataSource<TeamDTO>();
  displayedColumns: string[] = ['id', 'name'];
  userEmail:any = this.tokenStorage.getLoggedUserEmail();

  ngOnInit(): void {
    this.getUserByEmail(this.userEmail);
  }

  checkRole(){
    if(this.user.role === RoleName.MENTOR){
      this.isMentor = true;
      this.dataSource.data = this.user.teams;
    }
  }

  joinedGroup(){
    console.log(this.user.teamAffilation);
    if(this.user.teamAffilation != null && this.user.teamAffilation != undefined){
      this.memberOfTeam = true;
    }
  }

  getUserByEmail(email:string){
    this.userService.getByEmail(email).subscribe( (response: UserDTO) =>{
      this.user = response;
    })
  }
}
