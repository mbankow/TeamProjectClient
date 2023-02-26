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
import { ActivatedRoute } from '@angular/router';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { RoleName } from 'src/app/models/enums/role-name';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService,private snackBar: MatSnackBar,private router: ActivatedRoute) { }

  public user!: UserDTO;
  public routes: typeof routes = routes;
  isAdmin: boolean = true;
  public roleNameEnum = this.getEnumKeys(RoleName);
  public userGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    firm: new FormControl(""),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role: new FormControl(),
    teams: new FormControl(),
    students: new FormControl()
  });



  ngOnInit(): void {
    //this.getUserById(this.router.snapshot.params.email);
    this.userGroup.patchValue(this.user);
    console.log(this.user.role)
    console.log(RoleName.ADMIN)
    console.log(RoleName.MENTOR)
    console.log(RoleName.STUDENT)
  }


  getUserByEmail(email:string){
    this.userService.getByEmail(email).subscribe( (response: UserDTO) =>{
      this.user = response;
      this.userGroup.patchValue(this.user);
    })
  }

  public updateUser(): void {
    this.userService.update(this.user).subscribe({
      next:(response: UserDTO) => this.userGroup.reset(),
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        this.userGroup.reset();
      }
    });
  }

  changeSelectedRole(role:RoleName){
    console.log(role);
    this.userGroup.patchValue({role: role});
  }

  public getEnumKeys(myEnum: any): String[] {
    return Object.values(myEnum).filter(value => typeof value === 'string') as string[];
  }

  invalidForm(){
    this.openSnackBar("Proszę poprawnie wypełnić formularz użytkownika");
  }

  openSnackBar(message:string){
    this.snackBar.open(message, "X");
  }

}
