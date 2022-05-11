import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public routes: typeof routes = routes;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
