import { Component, OnInit } from '@angular/core';
import { UserService,NoteService } from '../../service';
import { Router } from '@angular/router';
import { UserNotes } from '../../object/userNotes';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  
  model : any={}; 
 notes : UserNotes[];
  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit() {
    
    console.log('in get service');
    this.noteService.getNotes().subscribe(res => {
      this.notes = res;
      console.log(this.notes);
  });
  }

  deleteNote(noteId){

    this.noteService.deleteNote(noteId).subscribe(response =>{

      console.log(noteId);
    });
  }

  restoreNotes(note,status,field){

    this.noteService.updateNotes(note,status,field).subscribe(response =>{

        console.log('record update', response);
    });


  }
}