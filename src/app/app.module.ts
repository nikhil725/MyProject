import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule} from '@angular/forms'
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UserService} from './service/user.service';
import {NoteService} from './service/note.service' ;
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule,MatNativeDateModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { ReturntoSignupComponent } from './component/returnto-signup/returnto-signup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NoteComponent } from './component/note/note.component';
import {MatMenuModule} from '@angular/material/menu';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReminderComponent} from './component/reminder/reminder.component';
import { MatChipsModule } from '@angular/material/chips';
import { LabelComponent } from './component/label/label.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { AuthGuard,LoggedInAuthGuard } from './auth/index';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import {LabelService} from './service/label.service' ;
import { Filter} from './filter.pipe';
import { CommonComponent } from './component/common/common.component';
import { TruncatePipe } from './truncate.pipe';
import { UpdateComponent } from './component/update/update.component';
import { ColorToolDirective } from './color-tool.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ForgotComponent,
    ReturntoSignupComponent,
    NoteComponent,
    TrashComponent,
    ArchiveComponent,
    ReminderComponent,
    LabelComponent,
    ResetpasswordComponent,
    CollaboratorComponent,  
    Filter, 
    CommonComponent, TruncatePipe, UpdateComponent, ColorToolDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  exports: [],
  entryComponents:[LabelComponent,CollaboratorComponent, UpdateComponent],
  providers: [UserService,NoteService,LabelService,AuthGuard,LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
