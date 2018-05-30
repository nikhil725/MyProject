import { Component, OnInit } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { NoteService, UserService } from '../../service';
import { Label } from '../../object/Label';
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import {FormsModule, FormGroup, FormControl, FormBuilder} from '@angular/forms'
import { User } from '../../object/User';

import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {};
  public fundooNotes;
  labels: Label[];
  profilePic = "assets/icons/account.svg";
  homeForm: FormGroup;
  inputFormControl: FormControl;
  username:string;
  useremail:string;
  user: User;
  constructor(private noteService: NoteService, private dialog: MatDialog, private router: Router,
              private builder: FormBuilder, private userService: UserService, private _activatedRouter: ActivatedRoute)
               {

            this.inputFormControl = new FormControl();
            this.homeForm = this.builder.group({inputFormControl: this.inputFormControl //get home html input
            }); 

// this._activatedRouter.params.subscribe(params=>
//   {
// console.log("Activated Route:"+JSON.stringify(params));    
//   })

this.router.events.pipe(
filter(events=>events instanceof NavigationEnd)
)
.subscribe(
  ({url}:NavigationEnd)=>
  {
    console.log("Routing Url:"+url);
    var index=url.split('/').length;
    console.log("Length of URL Split:"+index);
    var urlsplit=url.split('/')[index-1];
    console.log("Splittted URL"+urlsplit);
    this.fundooNotes=urlsplit.toUpperCase();
  }


)






         }

  ngOnInit() {
    this.getAllLabels();
    this.searchText(); 
  }

getRouteName(label:any)
{
this.router.navigate(['/home/labelonnote',label.name]);
localStorage.setItem("labelid",label.labelId);
}






  //This method use to search text
  searchText(){
     
    this.homeForm.valueChanges.subscribe(
      (formData) => {
        this.userService.onDataChangeInSearch(formData.inputFormControl);
      });
  }
  openDialog(label) {
    this.dialog.open(LabelComponent, {

      width: '400px',
      height: '210px',
      data : {
        labels : this.labels
      }
    });
  }
  signOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  changeCards(){

     this.noteService.changeView();
    debugger;
  }
  
  loggedUser(){
    this.userService.getUser('getUserById').subscribe(response => {
      this.user = response;
      this.username = response.name;
      this.useremail = response.email;
      console.log('User information', this.user);
    });
  }

  addAccount(){
    this.router.navigate(['/login']);
  }

  getAllLabels(){
console.log('in side home');
    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
      console.log(this.labels);
    });
  }
}
