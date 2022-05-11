import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { MainMenuComponent } from './page/tpro/main-menu/main-menu.component';
import { AddProjectComponent } from './page/tpro/projects/add/add.component';
import { EditProjectComponent } from './page/tpro/projects/edit/edit.component';
import { TableProjectComponent } from './page/tpro/projects/table/table.component';

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
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
