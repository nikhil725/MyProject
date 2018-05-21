import { Injectable,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {UserNotes } from '../object/userNotes';
import {Label} from '../object/Label';
import { UserService } from "./user.service";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LabelService{
    
  public labels : Array<any> = [];
  private labelSubject = new Subject<any>();
constructor(private userService : UserService ) { }


@Output() changeLabel: EventEmitter<Array<any>> = new EventEmitter();

  reloadLabels():void{
    var path = "getlabels";
    this.userService.getService(path)
                        .toPromise()
                          .then((res)=>{
                            this.labels = res;
                            this.changeLabel.emit(res);
                            this.labelSubject.next(res);
                          });
   }
  
  getLabels(): Observable<Label[]>{
  return this.userService.getService('getLabels');
}

  deleteLabel(labelId): Observable<any>{

    return this.userService.deleteService('deleteLabel/'+ labelId);
    
  }

}