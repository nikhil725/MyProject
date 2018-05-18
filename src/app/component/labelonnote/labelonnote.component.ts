import { Component, OnInit } from '@angular/core';
import { UserService, NoteService, LabelService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { UserNotes } from '../../object/userNotes';
@Component({
  selector: 'app-labelonnote',
  templateUrl: './labelonnote.component.html',
  styleUrls: ['./labelonnote.component.css']
})
export class LabelonnoteComponent implements OnInit {
public id;
public labelId:number;
model:any;
notes:UserNotes[];
  constructor(private route: ActivatedRoute,private noteService: NoteService) { }

  ngOnInit() {
      this.noteService.getAllNotes().subscribe(response => {
     this.notes= response
     console.log( "getAllnotes",this.notes=response);
    });
  
   this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log('in dynamic componenet label id :',this.id);
   });
  }
}
