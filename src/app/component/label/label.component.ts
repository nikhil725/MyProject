import { Component, OnInit } from '@angular/core';
import { UserService, NoteService, LabelService } from '../../service';
import { Label } from '../../object/Label';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  model: any = {};
  labels: Label[];
  showHide1: boolean;

  clearImg = "/assets/icons/clear.svg";
  deletesvg = "/assets/icons/trash.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";

  imgSrc: string = "/assets/icons/trash.svg";
  imgSrc1: string = "/assets/icons/checkmark.png";

  onMouseOut() {
    this.imgSrc = "/assets/icons/label.svg";//plus interns genrate label icon
  }

  onMouseOver() {
    this.imgSrc = "/assets/icons/trash.svg";//delete symbol
  }
  changeStatus() {
    this.showHide1 = !this.showHide1;
  }

  constructor(private userService: UserService, private noteService: NoteService,
              private labelService: LabelService) { }

  ngOnInit() {

    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
      console.log(this.labels);
    });
  }
  createLabel(): void {
    console.log(this.model);
    this.userService.registerUser('createLabels', this.model)
      .subscribe(response => {
        console.log(" response Label  Created", response);
      });
  };

  deleteLabel(labelId){

    this.labelService.deleteLabel(labelId);
    debugger;
  }

}
