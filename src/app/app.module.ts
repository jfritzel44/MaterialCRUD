import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

import { MatDialogModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatDividerModule, 
  MatTableModule, MatCheckboxModule, MatCardModule, MatSnackBarModule, MatListModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatButtonModule,    
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddUserDialogComponent, EditUserDialogComponent],
})
export class AppModule { }
