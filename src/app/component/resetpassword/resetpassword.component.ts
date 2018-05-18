import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service';
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  model : any={};

  constructor(private userService:UserService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
   // this.route.params.subscribe( params => console.log(params['token']) );
 console.log(window.location.search);
  }

  resetPassword(){

    console.log(this.model);
    var url = 'resetPassword'+ window.location.search;
    console.log("token is: ",url)
    this.userService.registerUser(url,this.model).subscribe( response =>{
      console.log(this.model);
        console.log("successfull", response);
        if(response.statusCode === 200){
          alert("Password reset successfully")
          this.router.navigate(['/login']);
          console.log("password reset successfully");
        }else{ 

        console.log("Invalid Password or email");
       }
        
       
    }); 
  }
}
