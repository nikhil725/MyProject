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
  labelImages : Array<string> = [];

  clearImg = "/assets/icons/clear.svg";
  deletesvg = "/assets/icons/trash.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";

  imgSrc: string = "/assets/icons/trash.svg";
  imgSrc1: string = "/assets/icons/checkmark.png";

 onMouseOut(i)
  {
   this.imgSrc = "/assets/icons/label.svg";
   this.labelImages[i] = this.imgSrc;
   console.log(this.labelImages , i)
  }

  onMouseOver(i)
  {
    this.imgSrc = "/assets/icons/trash.svg";
    this.labelImages[i] = this.imgSrc;
  }

  
  changeStatus() {
    this.showHide1 = !this.showHide1;
  }

  constructor(private userService: UserService, private noteService: NoteService,
              private labelService: LabelService) { }

  ngOnInit() {

    this.getAllLabels(); 
  }
  createLabel(): void {
    console.log(this.model);
    this.userService.registerUser('createLabels', this.model)
      .subscribe(response => {
        console.log(" response Label  Created", response);
      });
      this.noteService.getLabels();
  };

  deleteLabel(labelId): void {

    this.labelService.deleteLabel(labelId).subscribe(response =>{
    });
  }

  getAllLabels(){
    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
      console.log(this.labels);
    });

  }

}
