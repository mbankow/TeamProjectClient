import { Component } from '@angular/core';
//import { TokenService } from 'src/app/service/token.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor() { }

  public routes: typeof routes = routes;

  showMenuContract = false;
  showMenuVendor = false;
  showMenuContact = false;
  showSettings = false;
  showMenuRequest = false;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  shouldRun2 = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  toggleMenuContract() {
    this.showMenuContract = !this.showMenuContract;
  }

  toggleMenuVendor() {
    this.showMenuVendor = !this.showMenuVendor;
  }

  toggleMenuContact() {
    this.showMenuContact = !this.showMenuContact;
  }

  toggleMenuRequest() {
    this.showMenuRequest = !this.showMenuRequest;
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  logOut(): void {
    //this.tokenService.logOut();
  }
}
