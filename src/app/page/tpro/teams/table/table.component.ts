import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { TeamDTO } from 'src/app/models/team-dto';
import { TeamService } from 'src/app/service/team.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-table-team',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableTeamComponent implements OnInit {

  constructor(private teamService: TeamService,public dialog:MatDialog) { }
  ngOnInit(): void {
    this.getTeams(1);
  }

  displayedColumns: string[] = ['position', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource<TeamDTO>();
  public teams!: TeamDTO[];
  public routes: typeof routes = routes;

  public getTeams(page: number): void {
    this.teamService.get(page).subscribe({
      next:(response: TeamDTO[]) => {
        this.teams = response;
        this.dataSource.data = response;
        console.log(this.teams)},
        error: (error: HttpErrorResponse) => alert(error.message)
      }
    )
  }

  public deleteTeam(team: TeamDTO){
    let dialogRef = this.dialog.open(DialogDeleteComponent,{});
    console.log(team.id);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.teamService.delete(team.id).subscribe({
            next:(response:void)=>
              this.getTeams(1),
            error:(error:HttpErrorResponse)=>
              alert(error.message)
            }
          );
        }
      })
  }
}
