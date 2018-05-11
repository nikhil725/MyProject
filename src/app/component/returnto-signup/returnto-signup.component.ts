import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returnto-signup',
  templateUrl: './returnto-signup.component.html',
  styleUrls: ['./returnto-signup.component.css']
})
export class ReturntoSignupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  returnsignin(){

        this.router.navigate(['/login']);


  }

}
