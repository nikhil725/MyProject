import { Component, OnInit, Inject } from '@angular/core';
import { UserService, NoteService } from '../../service';
import { UserNotes } from '../../object/userNotes';
import { collaborator } from '../../object/collaborator'
import { User } from '../../object/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})


export class CollaboratorComponent implements OnInit {

  addPerson = "assets/icons/addPerson.png";

  user: User;
  notes: any;
  collaborators: collaborator[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: UserNotes,
   private userService: UserService, private noteService: NoteService) { }

  model: any = {};
    clearSvg = '/assets/icons/clear.svg'

  ngOnInit() {

    this.notes = this.data;
    this.userService.getUser('getUserById').subscribe(response => {
      this.user = response;
      console.log('User information', this.user);
    });
     this.noteService.getNotes().subscribe(res => {
    this.notes = res;
    console.log('notes in side collaborator',this.notes);
    });
  }

  shareNotes() {
    this.model.noteId = this.data.noteId;
    console.log(this.model);
    var query = 'addcollaborator?sharedUserEmail=' + this.model.sharedUser + '&noteId=' + this.model.noteId;
    this.userService.registerUser(query, {}).subscribe(response => {

      console.log('successfull');
    });
  }

  removeCollaborator(sharedUserEmail){    
    this.model.noteId = this.data.noteId;
    console.log('email id is...', sharedUserEmail);
    var path = 'removecollaborator?sharedUserEmail=' + sharedUserEmail + '&noteId=' + this.model.noteId;
    this.userService.deleteService(path).subscribe(response =>{

            console.log('record deleted...');
    });

  }
}
