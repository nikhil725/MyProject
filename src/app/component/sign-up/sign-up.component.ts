import { Component, OnInit } from '@angular/core';
import { User } from '../../service/user.model';
import {NgForm } from '@angular/forms';
import { UserService } from '../../service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user : User;
  model : any={};
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
    this.user = {
      name:'',
      password: '',
      email: ''
    }
  }

    register():void{

      console.log(this.model);
     this.userService.registerUser('register',this.model).subscribe(data=>console.log(data));

    }

  // UpdateRecord(){

  //   this.userService.registerUser(form.value)
  //   .subscribe((data:any)=>{

  //     if(data.Succeeded == true)
  //       this.resetForm(form);
  //   });
  // }

}
