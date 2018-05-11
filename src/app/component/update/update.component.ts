import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UserNotes } from '../../object/userNotes';
import { UserService, NoteService, LabelService } from '../../service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

    note: UserNotes[];
    
  constructor(@Inject(MAT_DIALOG_DATA)  public data: UserNotes, private commonService:UserService,
  private noteService : NoteService, public MatRef:MatDialogRef<UpdateComponent>) { }

  ngOnInit() {
    document.getElementById('update-title').innerHTML = this.data.title;
    document.getElementById('update-description').innerHTML = this.data.description;
  }
   updateNote(){
    this.commonService.putService('updateNotes',this.data)
    .subscribe(response => {
     this.MatRef.close();
   });
  }
  deleteImage(note)
  {
    this.noteService.deleteImage(this.data.noteId).subscribe(response =>{
      console.log(this.data.noteId);
    });;  
  }
}
