import { Component, OnInit } from '@angular/core';
import { UserNotes } from '../../object/userNotes';
import { ColorList } from '../../colorList';
import { NoteService } from '../../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

    notes : UserNotes[];

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit() {
    console.log('in get service');
    this.noteService.getNotes().subscribe(res => {
      this.notes = res;
      console.log(this.notes);
    });
  }

  reminderUpdate(note,day,field){
    
    if(day==='Today'){
    var today =new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder= today;   
    }
    else if(day==='Tomorrow'){
      var today =new Date();
      today.setDate(today.getDate()+1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder= today;
    }else if(day==='Next week'){
      
      var today =new Date();
      today.setDate(today.getDate()+6);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder= today;  
    }else if(day==='null'){
      note.reminder=null;
    }

       this.noteService.updateNotes(note,status,field).subscribe(response => {
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
}
