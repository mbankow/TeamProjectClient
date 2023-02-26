import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes } from 'src/app/consts';
import { RoleName } from 'src/app/models/enums/role-name';
import { ProjectDTO } from 'src/app/models/project-dto';
import { UserDTO } from 'src/app/models/user-dto';
import { ProjectService } from 'src/app/service/project.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,private projectService: ProjectService,private snackBar: MatSnackBar,private userService: UserService) { }

  public projects: ProjectDTO[] = [];
  public routes: typeof routes = routes;
  user!: UserDTO;
  userEmail:any = this.tokenStorage.getLoggedUserEmail();
  ngOnInit(): void {
    this.getUserByEmail(this.userEmail);
    console.log("Zawartosc zmiennerj user");
    console.log(this.user);
    }

  public projectGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    owner: new FormControl("")
  });

  public addProject(): void {
    console.log(this.projectGroup.value)
    this.projectGroup.patchValue({owner:this.user});
    this.projectService.save(this.projectGroup.value).subscribe({
      next:(response: ProjectDTO) => {
        console.log(response);
        this.projectGroup.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.projectGroup.reset();
      }
    });
  }

  public updateUser(): void {
    this.userService.update(this.user).subscribe({
      next:(response: UserDTO) => {this.user = response, this.user = response},
      error:(error: HttpErrorResponse) => alert(error.message)
    });
  }

  getUserByEmail(email:string){
    this.userService.getByEmail(email).subscribe({
      next: (response) => {console.log(response),this.user = response},
      error: (error:HttpErrorResponse)=> alert(error.message)
    })
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz projektu");
  }

  openSnackBar(message:string="Projekt został utworzony pomyślnie."){
    this.snackBar.open(message, "X");
  }

}
