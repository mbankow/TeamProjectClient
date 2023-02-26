import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/consts';
import { TeamDTO } from 'src/app/models/team-dto';
import { TeamService } from 'src/app/service/team.service';
//TODO dodać edytowanie listy studentow w zespole
@Component({
  selector: 'app-edit-team',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditTeamComponent implements OnInit {

  constructor(private teamService: TeamService,private snackBar: MatSnackBar,private router: ActivatedRoute) { }

  public team!: TeamDTO;
  public routes: typeof routes = routes;
  public teamGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    choices: new FormControl()
  });

  ngOnInit(): void {
    this.getTeamById(this.router.snapshot.params.id);
  }

  getTeamById(id:number){
    this.teamService.getById(id).subscribe( response =>{
      this.team = response;
      this.teamGroup.patchValue(this.team);
    })
  }

  public updateTeam(): void {
    this.passNewValuesToTeam();
    this.teamService.update(this.team).subscribe({
      next:(response: TeamDTO) => this.teamGroup.reset(),
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.teamGroup.reset();
      }
    });
  }

  passNewValuesToTeam(){
    this.team.name = this.teamGroup.get('name')?.value;
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz zespołu");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }
}
