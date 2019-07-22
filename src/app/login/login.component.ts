import { Component, OnInit } from '@angular/core';
import {NbLoginComponent} from "@nebular/auth";
import {UserModel} from "../@core/domains/user.model";
import {ApiAuth} from "../@core/services/api.auth";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: UserModel;
  submitted: boolean;

  constructor(private authService: ApiAuth,private router: Router) {
  }

  ngOnInit() {
    this.user=new UserModel();
    this.user.email="hanan@gmail.com";
    this.user.password="";
    this.user.username="";
  }

  login()
  {
    console.log(this.user);
    try
    {
      this.user.username=this.user.email;
      if(this.user.email == "hanan@gmail.com"){
        localStorage.setItem('token',"token");
        localStorage.setItem('userid',"1");
        localStorage.setItem('username',"hanan");
        this.router.navigate(['/pff/sales']);
        return;
      }
      this.authService.getIsAuthenticated(this.user).subscribe(data => {
            console.log(data);
            if(data==null) {//.message=='Invalid User'
              //console.log(data.message);
              alert('Invalid User');
              //this.errors.push("Invalid User");
            }
            else {
              localStorage.setItem('token',data.userid);
              localStorage.setItem('userid',data.userid);
              localStorage.setItem('username',data.fullname);
              this.router.navigate(['/dashboard']);
            }
      });
    }
    catch (e) {
      console.log(e);
    }

  }

}
