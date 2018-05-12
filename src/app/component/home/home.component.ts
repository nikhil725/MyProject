import { Component, OnInit } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { NoteService, UserService } from '../../service';
import { Label } from '../../object/Label';
import { Router } from '@angular/router';
import {FormsModule, FormGroup, FormControl, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {};
  labels: Label[];
  profilePic = "assets/icons/account.svg";
  homeForm: FormGroup;
  inputFormControl: FormControl;
  constructor(private noteService: NoteService, private dialog: MatDialog, private router: Router,
              private builder: FormBuilder, private userService: UserService)
               {

            this.inputFormControl = new FormControl();
            this.homeForm = this.builder.group({
            
            inputFormControl: this.inputFormControl //get home html input
            }); 
         }

// constructor(private builder: FormBuilder,private router:Router,private commonService:HttputilService,
// private dialog: MatDialog) {

// this.inputFormControl = new FormControl();
// this.homeForm = this.builder.group({
// inputFormControl: this.inputFormControl //get home html input
// }); 


  ngOnInit() {
    console.log('in side home');
    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
      console.log(this.labels);
    });
    this.searchText();
  }

  //to search my text
  searchText(){
      console.log("dsgsdsdgsdgsdgsdgsdgsdgshfdhfdh",this.inputFormControl);
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
}
