import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MainMenuComponent } from './page/tpro/main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { TableProjectComponent } from './page/tpro/projects/table/table.component';
import { DialogDeleteComponent } from './page/tpro/dialog-delete/dialog-delete.component';
import { AddProjectComponent } from './page/tpro/projects/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditProjectComponent } from './page/tpro/projects/edit/edit.component';
import { TableTeamComponent } from './page/tpro/teams/table/table.component';
import { AddTeamComponent } from './page/tpro/teams/add/add.component';
import { EditTeamComponent } from './page/tpro/teams/edit/edit.component';
import { TableUserComponent } from './page/tpro/users/table/table.component';
import { MatSelectModule } from '@angular/material/select';
import { AddUserComponent } from './page/tpro/users/add/add.component';
import { EditUserComponent } from './page/tpro/users/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { ViewUserComponent } from './page/tpro/users/view/view.component';
import { ViewTeamComponent } from './page/tpro/teams/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    MainComponent,
    MainMenuComponent,
    TableProjectComponent,
    DialogDeleteComponent,
    AddProjectComponent,
    EditProjectComponent,
    TableTeamComponent,
    AddTeamComponent,
    EditTeamComponent,
    TableUserComponent,
    AddUserComponent,
    EditUserComponent,
    RegisterComponent,
    ViewUserComponent,
    ViewTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatMenuModule,
    MatInputModule,
    FormsModule
  ],
  exports:[
    FooterComponent,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
