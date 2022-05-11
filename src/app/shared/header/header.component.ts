import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { routes } from 'src/app/consts';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isMenuOpened!: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public routers: typeof routes = routes;
  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }
}
