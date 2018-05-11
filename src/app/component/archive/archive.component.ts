import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service';
import { Router } from '@angular/router';
import { UserNotes } from '../../object/userNotes';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  model : any={};
 notes : UserNotes[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

     console.log('in get service');
    this.userService.getService('getNotes').subscribe(res => {
      this.notes = res;
      console.log(this.notes);
  });
  }

  updateNote(note, status){

    note.archive = status;
    this.userService.putService('updateNotes',note).subscribe(response =>{

      console.log('successfull',response);
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
