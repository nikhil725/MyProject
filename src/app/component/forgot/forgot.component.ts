import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

      model : any={};


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  forgot(){
    console.log(this.model);
    console.log("in login");
    this.userService.registerUser('forgotPassword',this.model).subscribe(res=>{

       if(res.statusCode === 200){

        console.log("mail send successfully");
        this.router.navigate(['/returnto-signup']);
      }
      else{   
        console.log("Invalid Password or email");
    }
    
  })
  }
}