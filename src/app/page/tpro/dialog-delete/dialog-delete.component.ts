import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  public message: string = "Czy na pewno usunąć zawartość?";
  public confirmation: string = "Usuń";
  ngOnInit(): void {
    console.log(this.data.message);
    console.log(this.data.confirmation);
    this.changeMessage()
  }
  changeMessage(){
    if(this.data.message.length > 0){
      this.message = this.data.message;
    }
    if(this.data.confirmation.length > 0){
      this.confirmation = this.data.confirmation;
    }
  }
}
