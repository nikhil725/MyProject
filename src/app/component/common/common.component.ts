import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { UserService, NoteService, LabelService } from '../../service';
import { Router } from '@angular/router';
import { UserNotes } from '../../object/userNotes';
import { UrlResponse } from '../../object/UrlResponse';
import { ColorList } from '../../colorList';
import { Label } from '../../object/Label';
import { CollaboratorComponent } from '../../component/collaborator/collaborator.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../../component/update/update.component';


@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  @Input() note: any;
model: any = {};
  labels: Label[];

  urlRes: UrlResponse;
  notes: UserNotes[];
  // colors : ColorList[];

  pinSvg = '/assets/icons/pin.svg';
  unpinSvg = '/assets/icons/unpin.svg';
  reminderSvg = '/assets/icons/reminder.svg'
  clearSvg = '/assets/icons/clear.svg'

  constructor(private noteService: NoteService, private labelService: LabelService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
       console.log('in get service');
    this.noteService.getNotes().subscribe(res => {
  
      this.notes = res.map(noteObj => {
        if (this.urlFormat(noteObj.description))
          noteObj.urlPromise = this.getUrlData(noteObj.description).map(res => {
            console.log(res);
            return res.body;
          });
           console.log(noteObj);
        return noteObj;
      })
       this.notes.forEach(note=>{
             note.imageString = 'data:image/jpg;base64,'+note.image;
       })

      console.log('notes..', this.notes);
    });
  }


  checkStatus(note, status, field,){

    if(status== 'true'){  
      this.pinNote(note, true, field);
    }else{
      this.unpinNote(note, false, field);
    }
  }

  pinNote(note,status,field){

 this.noteService.updateNotes(note, status, field).subscribe(response => {
      console.log("successfull", response)
    });
  }

  unpinNote(note, status, field){
this.noteService.updateNotes(note, status, field).subscribe(response => {
      console.log("successfull", response)
    });
  }
 openDialogForUpdate(note) {
    this.dialog.open(UpdateComponent, {
      data: note,

      width: '500px',
      height: '350px'
    });
  }

  createNote() {
    console.log(this.model);
    console.log("in create note");
    this.noteService.createNotes(this.model).subscribe(response => {
      console.log("successfull", response);

    });
  }

  updateNote(note, status, field) {

    console.log('notes: ', note);
    console.log(field);
    this.noteService.updateNotes(note, status, field).subscribe(response => {
      console.log("successfull", response)
    });
  }

  reminderUpdate(note, day, field) {

    if (day === 'Today') {
      var today = new Date();
      today.setHours(20);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    }
    else if (day === 'Tomorrow') {
      var today = new Date();
      today.setDate(today.getDate() + 1);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'Next week') {

      var today = new Date();
      today.setDate(today.getDate() + 6);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'null') {
      note.reminder = null;
    }
    this.noteService.updateNotes(note, status, field).subscribe(response => {
      console.log("Archive  response", response);

    });
  }

  colors = [{

    color: '#f26f75',
    path: '/assets/icons/Red.png'
  },
  {
    color: '#fcff77',
    path: '/assets/icons/lightyellow.png'
  },
  {
    color: '#80ff80',
    path: '/assets/icons/green.png'
  },
  {
    color: '#9ee0ff',
    path: '/assets/icons/blue.png'
  },
  {
    color: '#9966ff',
    path: '/assets/icons/purple.png'
  },
  {
    color: '#ff99cc',
    path: '/assets/icons/pink.png'
  },
  {
    color: '#bfbfbf',
    path: '/assets/icons/grey.png'
  },
  {
    color: '#a52a2a',
    path: '/assets/icons/brown.png'
  }
  ];

  getLabels() {
    this.labelService.getLabels().subscribe(res => {

      this.labels = res;
      console.log(this.labels);
    });
  }

  addLabelOnNote(operation, noteId, labelId) {

    this.noteService.addLabelOnNote(operation, labelId, noteId);
    console.log(operation, noteId, labelId);
  }

  removeLabel(status, noteId, labelId) {

    this.noteService.removeLabelOnNote(status, labelId, noteId);
    console.log(status, noteId, labelId);
  }

  openDialog(note) {
    this.dialog.open(CollaboratorComponent, {
      data: note,
      width: '400px',
      height: '210px'
    });
  }

  getUrlData(description: string): Observable<any> {
    let url = this.urlFormat(description);
    if (!url) {
      let subjectObj = new Subject<any>();
      return subjectObj.asObservable();
    }
    return this.noteService.getUrlData(url)
  }

urlFormat(text) : Array <string> {
  console.log("text222",text);
  var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return text.match(urlRegex);
  
}
fileInput(file: File, noteId) {
    console.log('file', file);
    this.noteService.imageUpload(file, noteId);
}
}
