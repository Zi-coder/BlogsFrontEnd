import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "../../Services/HttpClient/http-client.service";
import { Router } from "@angular/router";
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './must-watch.validator';
declare const Email: any;
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  user: FormGroup;
  submitted = false;
  otp;

  constructor(private formBuilder: FormBuilder,  private UserHttpService: HttpClientService,
    private router: Router,
    private auth: AuthenticateService) { }

  ngOnInit() {
     this.build();
     this.otp = this.randomGen();
  }
  sendMail(username,otp){
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "akaydummy238444@gmail.com",
      Password: "3b5a2d2b-133b-495b-bf41-a057999eb892",
      To: username,
      From: "akaydummy238444@gmail.com",
      Subject: "Enter the OTP to Register",
      Body:"Enter the Otp " +  otp
    }
    ).then( (message) => {
      this.verify();});
      
  }
  build(){
    this.user = this.formBuilder.group({
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.user.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.user.invalid) {
          return;
      }

      // display form values on success
      this.sendMail(this.user.value.username,this.otp);
      
  }

  onReset() {
      this.submitted = false;
      this.user.reset();
  }
  verify(){
    var rec = prompt("Wait for a Minute for Otp and then \nEnter OTP Recieved on Mail\nCheck spam if not found in Inbox");
  
    
    
    if(rec == this.otp){
      this.UserHttpService.register(this.user.value).subscribe(
        response => {
          alert(response);
          this.auth.authenticate(this.user.value.username,this.user.value.password).subscribe(
            (data)=>{
              this.router.navigate(['home']);    
            }
          );
          this.router.navigate(["login"]);
        },
        error => {
          alert("Username Already Exist");
        }
      );
    }else{
      alert("Not Accepted");
    }
  }
  randomGen() {
    var otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
}