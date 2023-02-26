import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/service/user.service';
import { UserDTO } from 'src/app/models/user-dto';
import { RoleName } from 'src/app/models/enums/role-name';
import { routes } from 'src/app/consts';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableUserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'role', 'delete'];
  users: UserDTO[] = [];
  editUser!: UserDTO;
  dataSource = new MatTableDataSource<UserDTO>();
  page: number = 2;
  sortBy: String = "id";
  previousSortBy: String = this.sortBy;
  isFirst: Boolean = true;
  isLast: Boolean = false;
  maxPageNumber: number = 0;
  ascending: boolean = true;
  sortByRole: boolean = false;
  sortById: boolean = true;
  public routes: typeof routes = routes;


 constructor(private userService: UserService, private snackBar: MatSnackBar, public dialog:MatDialog) {
  }

  public getUsers(page: number): void {
    this.userService.get(page).subscribe({
      next:(response) => {
        this.users = response;
        this.dataSource.data = this.users;
        console.log(response)
        //this.maxPageNumber = Number(response.headers.get('Max-Page'));
        //this.isOnlyOnePage();
      },
      error:(error: HttpErrorResponse) => alert(error.message)
      }
    )
  }

  public updateUser(page: number, user: UserDTO): void {
    this.userService.update(user).subscribe({
      next:(response: UserDTO) => this.getUsers(page),
      error:(error: HttpErrorResponse) => alert(error.message)
      }
    );

  }

  public deleteUser(user: UserDTO){
    let dialogRef = this.dialog.open(DialogDeleteComponent,{data:{message:"Czy na pewno usunąć uzytkownika?", confirmation:"Usuń"}});
    console.log(user.id);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.userService.delete(user.id).subscribe({
            next:(response:void)=>{
              this.getUsers(this.page),
              this.openSnackBar("Użytkownik został pomyślnie usunięty.")},
            error:(error:HttpErrorResponse)=>
              alert(error.message)
            }
          );
        }
      })
  }

  public changeSelectedRole(id: number, role: RoleName): void {
    this.editUser = this.users.find(user => user.id == id)!;
    this.editUser.role = role;
    this.updateUser(this.page, this.editUser);
    this.openSnackBar('Rola dla ' + this.editUser.name + ' '
      + this.editUser.lastName + ' została ustawiona na '
      + role.toString().replace("ROLE_", ""));
  }

  ngOnInit(): void {
    this.getUsers(this.page);
    //this.dataSource.data = this.users2;
  }

  openSnackBar(message: string = "Użytkownik został usunięty pomyślnie."): void {
    this.snackBar.open(message, "X");
  }
}
