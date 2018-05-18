import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroupDirective, Validators,FormsModule} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup} from '@angular/forms';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
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
  emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9+_.-]+@{1}[a-z](.+){1}[a-z]')
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z0-9]{5,}$')
  ]);
  match = new MyErrorStateMatcher();
}