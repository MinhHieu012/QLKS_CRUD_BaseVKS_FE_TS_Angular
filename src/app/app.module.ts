import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { UserComponent } from './component/user/user.component';
import { RoomComponent } from './component/room/room.component';
import { RoomtypeComponent } from './component/roomtype/roomtype.component';
import { BookingComponent } from './component/booking/booking.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { UserAddComponent } from './component/user/modal/user-add/user-add.component';
import { UserUpdateComponent } from './component/user/modal/user-update/user-update.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RoomComponent,
    RoomtypeComponent,
    BookingComponent,
    UserAddComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PasswordModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    CalendarModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    DividerModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
