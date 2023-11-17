import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NavigationModule } from '@progress/kendo-angular-navigation';

import { LayoutModule } from "@progress/kendo-angular-layout";
import { IconsModule } from "@progress/kendo-angular-icons";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DatePipe, IntlModule } from "@progress/kendo-angular-intl";

import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashBoardComponent,
    DialogComponent,
    HomePageComponent,
    UpdateDialogComponent,
    UserDetailsComponent,
    DefaultPageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IntlModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    DateInputsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    LayoutModule,
    IconsModule,
    MatDialogModule,
    ButtonsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogsModule,
    InputsModule,
    NavigationModule,
    DateInputsModule
  ],
  providers: [DatePipe  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
