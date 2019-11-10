import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  constructor(private authenticate: AuthenticateService,private router:Router) { }

  ngOnInit() {
    this.authenticate.logOut();

  }
  login(){
    this.authenticate.authenticate(this.username,this.password).subscribe(
      (data)=>{
      this.router.navigate(['home']);    
      },
      (error)=>{
      alert("Incorrect Credential");
      }
    )
  }
}
