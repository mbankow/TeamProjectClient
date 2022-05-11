import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes } from 'src/app/consts';
import { ProjectDTO } from 'src/app/models/project-dto';
import { ProjectService } from 'src/app/service/project.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,private snackBar: MatSnackBar) { }

  public projects: ProjectDTO[] = [];
  public routes: typeof routes = routes;

  ngOnInit(): void {
    }

  public projectGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("")
  });

  public addProject(): void {
    console.log(this.projectGroup.value)
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
  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz projektu");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }

}
