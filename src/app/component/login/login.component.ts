import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  
    model : any={};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
   
  }

  login(){
   
    console.log(this.model);
    this.userService.postService('login',this.model).subscribe(response=>{
    console.log(this.model);


      if(response.status === 200){

        console.log("in login");
        console.log('auth',response);
        localStorage.setItem('Authorization', response.headers.get("Authorization"))
        this.userService.setAuthorization();
        this.router.navigate(['/home/note']);
      }
      else{if (response.status !== 200) {
        alert(response.message);
        console.log("Invalid Password or email")
      }   
            console.log(this.model);

      }
    })
    
  }
}