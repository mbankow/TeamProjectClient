import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UserDTO } from 'src/app/models/user-dto';
import { routes } from 'src/app/consts';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RoleName } from 'src/app/models/enums/role-name';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public routes: typeof routes = routes;
  constructor(public dialog: MatDialog, private userService: AuthService,private snackBar: MatSnackBar) { }
  loginValid: boolean = true;

  public userGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    firm: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    role: new FormControl(),
    teams: new FormControl(),
    students: new FormControl()
  });

  ngOnInit(): void {
  }

  public addUser(): void {
    console.log(this.userGroup.value)
    this.userGroup.patchValue({role:"ROLE_STUDENT", firm:"brak"})
    console.log(this.userGroup.value)
    this.userService.register(this.userGroup.value).subscribe({
      next:(response) => {
        console.log("odpowiedz serwera")
        console.log(response);
        this.openSnackBar(response);
        this.userGroup.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.userGroup.reset();
      }
    });
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz rejestracji");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }
}
