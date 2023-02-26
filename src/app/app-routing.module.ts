import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { MainMenuComponent } from './page/tpro/main-menu/main-menu.component';
import { AddProjectComponent } from './page/tpro/projects/add/add.component';
import { EditProjectComponent } from './page/tpro/projects/edit/edit.component';
import { TableProjectComponent } from './page/tpro/projects/table/table.component';
import { AddTeamComponent } from './page/tpro/teams/add/add.component';
import { EditTeamComponent } from './page/tpro/teams/edit/edit.component';
import { TableTeamComponent } from './page/tpro/teams/table/table.component';
import { AddUserComponent } from './page/tpro/users/add/add.component';
import { EditUserComponent } from './page/tpro/users/edit/edit.component';
import { TableUserComponent } from './page/tpro/users/table/table.component';
import { ViewUserComponent } from './page/tpro/users/view/view.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
		path: '',
		pathMatch: 'full',
		component: MainComponent
	},
  {
		path: 'mainMenu',
		pathMatch: 'full',
		component: MainMenuComponent
	},
  {
		path: 'register',
		pathMatch: 'full',
		component: RegisterComponent
	},
  {
		path: 'projectList',
		pathMatch: 'full',
		component: TableProjectComponent
	},
  {
		path: 'projectAdd',
		pathMatch: 'full',
		component: AddProjectComponent
	},
  {
		path: 'projectEdit/:id',
		pathMatch: 'full',
		component: EditProjectComponent
	},
  {
		path: 'teamList',
		pathMatch: 'full',
		component: TableTeamComponent
	},
  {
		path: 'teamAdd',
		pathMatch: 'full',
		component: AddTeamComponent
	},
  {
		path: 'teamEdit/:id',
		pathMatch: 'full',
		component: EditTeamComponent
	},
  {
		path: 'userList',
		pathMatch: 'full',
		component: TableUserComponent
	},
  {
		path: 'userAdd',
		pathMatch: 'full',
		component: AddUserComponent
	},
  {
		path: 'userEdit/:id',
		pathMatch: 'full',
		component: EditUserComponent
	},
  {
		path: 'userProfile',
		pathMatch: 'full',
		component: ViewUserComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
