import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "src/app/Services/HttpClient/http-client.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  user: any = false;
  userForm : FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private http: HttpClientService, private router: Router) {}

  ngOnInit() {
    this.http.currentUser().subscribe(
      resp => {
        this.user = resp;
        this.userForm = this.formBuilder.group({
          id:[this.user.id],
          password:[this.user.password],
          username:[this.user.username],
          fullname:[this.user.fullname, Validators.minLength(4)],
          contact :[this.user.contact,Validators.pattern('[0-9]{10}')],
          photo :[this.user.photo],
          bio : [this.user.bio,Validators.minLength(10)]
        })
      },(error)=>{
        alert(error);
      }
      //(error) => console.log(error)
    );
  }
  get f() { return this.userForm.controls; }
  register() {
      //profile
      this.submitted = true;
      if (this.userForm.invalid) {
        return;
      }
     
      this.http.editUserDetails(this.userForm.value).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(["profile"]);
        },
        error => console.error(error)
      );
    }
    onReset() {
      this.submitted = false;
      this.userForm.reset();
  }
}
