import { HttpErrorResponse } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes } from 'src/app/consts';
import { TeamDTO } from 'src/app/models/team-dto';
import { UserDTO } from 'src/app/models/user-dto';
import { TeamService } from 'src/app/service/team.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
//TODO dorobić dodawanie studentów do zespołu (nie ma)
@Component({
  selector: 'app-add-team',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddTeamComponent implements OnInit {

  constructor(private teamService: TeamService,private snackBar: MatSnackBar, private userService: UserService,
              private tokenStorage:TokenStorageService) { }

  public chosenStudents: UserDTO[] = [];
  public teams: TeamDTO[] = [];
  public routes: typeof routes = routes;
  email:any = this.tokenStorage.getLoggedUserEmail();
  user!:UserDTO;

  ngOnInit(): void {
    this.getUserByEmail();
  }

  public teamGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    choices: new FormControl("", [Validators.required]),
    students: new FormControl("")
  });

  getUserByEmail(){
    this.userService.getByEmail(this.email).subscribe({
      next:(response) =>{
        this.user = response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public addTeam(): void {
    this.teamGroup.patchValue({students: []})
    console.log(this.teamGroup.value)
    this.teamService.save(this.teamGroup.value).subscribe({
      next:(response: TeamDTO) => {
        this.user.teamAffilation = response;
        this.userService.update(this.user);
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.teamGroup.reset();
      }
    });
  }
  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz zespołu");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }
}
