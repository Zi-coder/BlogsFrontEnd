import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
import { Router } from '@angular/router';
declare const Email: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
  username:"",
  password:""
  }
  
  otp;
  constructor(private authenticate: AuthenticateService,private router:Router) { }

  ngOnInit() {
    this.authenticate.logOut();
    this.otp = this.randomGen();

  }
  login(){
    this.authenticate.authenticate(this.user.username,this.user.password).subscribe(
      (data)=>{
      this.router.navigate(['home']);    
      },
      (error)=>{
      alert("Incorrect Credential");
      }
    )
  }
  sendMail(username,otp){
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "akaydummy238444@gmail.com",
      Password: "3b5a2d2b-133b-495b-bf41-a057999eb892",
      To: username,
      From: "akaydummy238444@gmail.com",
      Subject: "Enter the OTP to Reset",
      Body:"Enter the Otp " +  otp
    }
    ).then( (message) => {
      //method to call after sending email
      this.afterMail(username);
      console.log(message)});
  }
  
  forgotPassword(){
    var username = prompt("Enter Username/Email",'username');
    if(username != 'username' && username != null){
      this.sendMail(username,this.otp);
    }else{
      alert("Cancelled");
    }
  }
  randomGen() {
    var otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
  afterMail(username){
   var otp = prompt("Enter OTP\nCheck Spam If not found in Inbox");
   if(otp == this.otp){
    this.user.username = username;
    var password1 = prompt("Enter Password \nLength should be > 6");
    var password2 = prompt("Enter Password Again");
    if((password1 == password2) && password1.length >= 6){
      this.user.password = password1;
      this.authenticate.changePassword(this.user).subscribe(
        (resp) => {
          alert("Password Changed");
          this.login();
          
        }
      )
    }else{
      alert("Passwords Error");
      this.ngOnInit();
    }
  
   }
  }

}
