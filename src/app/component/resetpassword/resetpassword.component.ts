import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  model : any={};

  constructor(private userService:UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => console.log(params['token']) );

  }

  resetPassword(){

    console.log(this.model);
    this.userService.registerUser('resetPassword',this.model).subscribe( response =>{
      console.log(this.model);
       console.log("successfull", response);
       
    });


    
  }

}
