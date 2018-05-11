import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {UserNotes } from '../object/userNotes';
import {Label} from '../object/Label';
import { UserService } from "./user.service"

@Injectable()
export class LabelService{
    
constructor(private userService : UserService ) { }
  
  getLabels(): Observable<Label[]>{
  return this.userService.getService('getLabels');
}

  deleteLabel(labelId){

    this.userService.deleteService('deleteLabel/'+ labelId);
    
  }

}