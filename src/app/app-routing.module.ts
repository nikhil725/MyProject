import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { ReturntoSignupComponent } from './component/returnto-signup/returnto-signup.component';
import { NoteComponent } from './component/note/note.component';
import { TrashComponent } from './component/trash/trash.component';
import {ArchiveComponent} from './component/archive/archive.component';
import {ReminderComponent} from './component/reminder/reminder.component';
import { AuthGuard,LoggedInAuthGuard } from './auth/index';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import {ResetpasswordComponent} from './component/resetpassword/resetpassword.component';
import { UpdateComponent } from './component/update/update.component';

// redirectTo will redirect the first page to login page by default
// path :'login' will redirect to LoginComponent in login.component.ts file.
// path : 'register' will redirect to RegisterComponent to register.component.ts file.

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    {
        path: 'home', component: HomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', redirectTo: 'note', pathMatch: 'full'},
            { path: 'note', component: NoteComponent },
            { path: 'trash', component: TrashComponent },
            { path: 'archive', component: ArchiveComponent },
            { path: 'reminder', component: ReminderComponent }
        ],
    },
    { path: 'forgot', component: ForgotComponent },
    { path: 'returnto-signup', component: ReturntoSignupComponent },
    { path: 'collaborator', component: CollaboratorComponent},
    { path: 'resetpassword/:token', component: ResetpasswordComponent},
    { path: 'update', component: UpdateComponent},
     { path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
