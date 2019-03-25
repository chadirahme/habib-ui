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
    this.user.email="";
    this.user.password="";
  }

  login()
  {
    console.log(this.user);
    try
    {
      this.authService.getIsAuthenticated(this.user).subscribe(data => {
            console.log(data);
            if(data.message=='Invalid User')
              this.errors.push("Invalid User");
            else {
              localStorage.setItem('token','1212121');
              this.router.navigate(['/dashboard']);
            }
      });

    }
    catch (e) {
      console.log(e);
    }

  }

}
