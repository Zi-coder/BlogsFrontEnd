// import { Component, OnInit } from "@angular/core";
// // import { HttpClientService } from "../../Services/HttpClient/http-client.service";
// import { Router } from "@angular/router";
// import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// declare const Email: any;
// @Component({
//   selector: "app-sign-up",
//   templateUrl: "./sign-up.component.html",
//   styleUrls: ["./sign-up.component.scss"]
// })
// export class SignUpComponent implements OnInit {
//   form = new FormGroup({
//     fullname: new FormControl('',Validators.required),
//     username: new FormControl('',Validators.email),

//   })
//   User = {
//     fullname: "",
//     username: "",
//     password: ""
//   };
//   password;
  
//   accept;
//   otp;
//   constructor(
//     private UserHttpService: HttpClientService,
//     private router: Router,
//     private auth: AuthenticateService
//   ) {}

//   ngOnInit() {
//     this.otp = this.randomGen();
   
//   }
//   sendMail(username,otp){
//     Email.send({
//       Host: "smtp.elasticemail.com",
//       Username: "akaydummy238444@gmail.com",
//       Password: "3b5a2d2b-133b-495b-bf41-a057999eb892",
//       To: username,
//       From: "akaydummy238444@gmail.com",
//       Subject: "Enter the OTP to Register",
//       Body:"Enter the Otp " +  otp
//     }
//     ).then( (message) => {
//       this.verify();
//       console.log(message)});
//   }
//   register() {
//     if (
//       this.password == "" ||
    
//       this.User.username == "" ||
//       this.User.fullname == ""
//     ) {
//       alert("Blank Field");
//     } else if (this.password1 != this.password2) {
//       alert("Password doesn't Match");
//     } else if (this.accept != true) {
//       alert("Accept Terms and Conditions");
//     } else {
      
//       this.User.password = this.password1;
      
//       this.sendMail(this.User.username,this.otp);
      
//     }
//   }
//   verify(){
//     var rec = prompt("Wait for a Minute for Otp and then \nEnter OTP Recieved on Mail\nCheck spam if not found in Inbox");
//     if(rec == this.otp){
//       this.UserHttpService.register(this.User).subscribe(
//         response => {
//           alert(response);
//           this.auth.authenticate(this.User.username,this.User.password).subscribe(
//             (data)=>{
//               this.router.navigate(['home']);    
//             }
//           );
//           this.router.navigate(["login"]);
//         },
//         error => {
//           alert("Username Already Exist");
//         }
//       );
//     }
//   }
//   randomGen() {
//     var otp = "";
//     for (let i = 0; i < 6; i++) {
//       otp += Math.floor(Math.random() * 10);
//     }
//     return otp;
//   }
// }
