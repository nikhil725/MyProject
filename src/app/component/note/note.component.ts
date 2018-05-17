import { Component, OnInit } from '@angular/core';
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
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  model: any = {};
  labels: Label[];

  urlRes: UrlResponse;
  notes: UserNotes[];
  //colors : ColorList[];
  //search
  noteForm: FormGroup;
  inputFormControl: FormControl;
  searchText: string;
  marginTop: string;
  flexSize: string;

  pinSvg = '/assets/icons/pin.svg';
  unpinSvg = '/assets/icons/unpin.svg';
  reminderSvg = '/assets/icons/reminder.svg'
  clearSvg = '/assets/icons/clear.svg'
  constructor(private noteService: NoteService, private labelService: LabelService,
    private router: Router, private dialog: MatDialog, private userService: UserService) {

    userService.searchObservable$.subscribe(
      formData => {
        this.searchText = formData;
        debugger;
        console.log("in note component, ", formData);
      });
  }


  // constructor(private commonService:HttputilService,private noteService: NoteService, private dialog: MatDialog) {
  // commonService.searchObservable$.subscribe(
  // formData => {
  // this.searchText = formData;
  // console.log("in note component, ", formData);
  // });
  // }



  ngOnInit() {
    console.log('in get service');
    this.refreshNote();
    this.getAllnotes();
    this.getLabels();
    this.changeGridCss();

  }
  changeGridCss() {

    this.noteService.getStatus().subscribe((status) => {
     this.marginTop = status ? "10px" : "0px";
      this.flexSize = status ? "100%" : "30%";
    });
  }
  openDialogForUpdate(note) {
    this.dialog.open(UpdateComponent, {
      data: note,

      width: '500px',
      height: '350px'
    });
  }

  refreshNote() {
    this.noteService.loadAllNotes();
    // getAllNotes().subscribe(res=>{
    // console.log(res);
    // })
  }
  getAllnotes(): any {

    // this.noteService.getNotes().subscribe(res => {
    this.noteService.getAllNotes().subscribe(res => {
      this.notes = res.map(noteObj => {
        if (this.urlFormat(noteObj.description))
          noteObj.urlPromise = this.getUrlData(noteObj.description).map(res => {
            console.log(res);
            return res.body;
          });
        console.log(noteObj);
        return noteObj;
      })
      this.notes.forEach(note => {
        note.imageString = 'data:image/jpg;base64,' + note.image;
      })
      console.log('notes..', this.notes);
    });
  }
  createNote() {
    this.noteService.createNotes(this.model).subscribe(response => {
      this.refreshNote();
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


  urlFormat(text): Array<string> {
    if (!text) {
      text = '';
    }
    console.log("text222", text);
    var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
    return text.match(urlRegex);

  }
  fileInput(file: File, noteId) {
    console.log('file', file);
    this.noteService.imageUpload(file, noteId);
  }

}