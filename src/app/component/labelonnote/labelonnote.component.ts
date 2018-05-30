import { Component, OnInit } from '@angular/core';
import { UserService, NoteService, LabelService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { UserNotes } from '../../object/userNotes';
import { Router } from '@angular/router';

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
  constructor(private route: ActivatedRoute,private routeChaneState: Router,private noteService: NoteService) 
  {

   }
public empty;
public hide:boolean;
  ngOnInit() {
      this.noteService.getAllNotes().subscribe(response => {
     this.notes= response;
console.log("Notes response:",this.notes);
     if(response == null)
      {
        
          this.empty= "No Notes are available";
          this.hide=true;
      }
        else
          {
                      this.hide=false;
          }
     console.log( "getAllnotes",this.notes=response);
    });
  
   this.route.params.subscribe(params => {
      // this.id = +params['id'];
      // console.log('in dynamic componenet label id :',this.id);
    var id=localStorage.getItem('labelid');
//    alert(id);
    this.id=id;
     
   });
   //this.emptyLabelNotes();
  }

  emptyLabelNotes()
  {
    console.log("hello routing need here")
  
  }
}
