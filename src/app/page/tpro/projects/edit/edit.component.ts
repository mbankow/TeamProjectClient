import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/consts';
import { RoleName } from 'src/app/models/enums/role-name';
import { ProjectDTO } from 'src/app/models/project-dto';
import { ProjectService } from 'src/app/service/project.service';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,private snackBar: MatSnackBar,private router: ActivatedRoute) { }

  public project!: ProjectDTO;
  public project2!: ProjectDTO;
  public routes: typeof routes = routes;

  ngOnInit(): void {
    //this.getProjectById(this.router.snapshot.params.id);
    this.projectGroup.patchValue(this.project2);
  }

  public projectGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("")
  });

  getProjectById(id:number){
    this.projectService.getById(id).subscribe( response =>{
      this.project = response;
      this.projectGroup.patchValue(this.project);
    })
  }

  public updateProject(): void {
    this.passNewValuesToProject();
    this.projectService.update(this.project).subscribe({
      next:(response: ProjectDTO) => {
        this.projectGroup.reset(),
        this.openSnackBar("Edycja projektu przebiegła pomyślnie.");
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.projectGroup.reset();
      }
    });
  }

  passNewValuesToProject(){
    this.project.name = this.projectGroup.get('name')?.value;
    this.project.description = this.projectGroup.get('description')?.value;
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz projektu");
  }
  savedPro(){
    this.openSnackBar("Edycja projektu przebiegła pomyślnie.");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }
}
