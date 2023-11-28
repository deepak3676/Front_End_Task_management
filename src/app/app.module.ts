import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HomePageComponent } from './component/home-page/home-page.component';
import { UpdateDialogComponent } from './component/update-dialog/update-dialog.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { DefaultPageComponent } from './component/default-page/default-page.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';


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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    DateInputsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
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
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
