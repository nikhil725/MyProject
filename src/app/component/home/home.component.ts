import { Component, OnInit } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { NoteService } from '../../service';
import { Label } from '../../object/Label';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {};
  labels: Label[];
  profilePic = "assets/icons/account.svg";
  constructor(private noteService: NoteService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    console.log('in side home');
    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
      console.log(this.labels);
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
