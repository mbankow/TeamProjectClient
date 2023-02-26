import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/service/user.service';
import { UserDTO } from 'src/app/models/user-dto';
import { routes } from 'src/app/consts';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RoleName } from 'src/app/models/enums/role-name';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: AuthService,private snackBar: MatSnackBar) { }

  public chosenStudents: UserDTO[] = [];
  public user: UserDTO = {id:0, name:'', lastName:'', firm:'', email:'', password:'', role: RoleName.MENTOR,
                          teams:[], projects:[], teamAffilation:null};
  public routes: typeof routes = routes;
  ngOnInit(): void {
    console.log()
  }

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

  public addUser(): void {
    console.log(this.userGroup.value)
    this.userGroup.patchValue({role: this.user.role});
    this.userService.register(this.userGroup.value).subscribe({
      next:(response: UserDTO) => {
        this.openSnackBar("Użytkownik został utworzony");
        this.userGroup.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.userGroup.reset();
      }
    });
  }

  changeSelectedRole(role:RoleName){
    this.userGroup.patchValue({role: role});
    console.log(this.userGroup.value.role);
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz zespołu");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }

}
