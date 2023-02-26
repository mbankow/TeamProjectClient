import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/consts';
import { RoleName } from 'src/app/models/enums/role-name';
import { TeamDTO } from 'src/app/models/team-dto';
import { UserDTO } from 'src/app/models/user-dto';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewTeamComponent implements OnInit {

  constructor(private teamService: TeamService, private router: ActivatedRoute) { }
  public team!: TeamDTO;
  public routes: typeof routes = routes;
  dataSource = new MatTableDataSource<UserDTO>();
  displayedColumns: string[] = ['id', 'name', 'lastName'];

  ngOnInit(): void {
    this.dataSource.data = this.team.students;
  }

  getTeamById(id:number){
    this.teamService.getById(id).subscribe( response =>{
      this.team = response;
     // this.teamGroup.patchValue(this.team);
    })
  }


}
