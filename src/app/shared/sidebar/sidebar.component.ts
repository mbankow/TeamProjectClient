import { Component } from '@angular/core';
import { RoleName } from 'src/app/models/enums/role-name';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private tokenService: TokenStorageService) { }

  public routes: typeof routes = routes;

  isAdmin: boolean = true;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  shouldRun2 = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  adminCheck(): boolean{
    if(this.tokenService.getLoggedUserRole() === RoleName.ADMIN){
        return true;
    }
    return false;
  }

  logOut(): void {
    this.tokenService.logOut();
  }
}
