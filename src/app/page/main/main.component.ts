import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public routes: typeof routes = routes;
  constructor(private router:Router, public dialog: MatDialog,private authService: AuthService, private tokenStorage: TokenStorageService,
              private snackBar: MatSnackBar) { }
  loginValid: boolean = true;
  isLoggedIn:boolean = false;
  isLoginFailed:boolean = false;
  errorMessage:string = '';
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
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    console.log(this.userGroup.value)
    this.authService.login(this.userGroup.value).subscribe({
      next: (response) => {
        console.log(response);
        this.tokenStorage.saveToken(response.value),
        this.isLoginFailed = false,
        this.isLoggedIn = true,
        this.router.navigateByUrl(routes.MAINMENU)
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error);
        this.errorMessage = error.message;
        this.openSnackBar("Nieprawidłowy login lub hasło");
        this.isLoginFailed = true;
      }}
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, "X");
  }

}
