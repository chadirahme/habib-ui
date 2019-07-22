import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {NbMenuItem} from "@nebular/theme";

@Component({
    selector: 'pff-header',
    templateUrl: './pffheader.component.html',
    styleUrls: ['./pffheader.component.scss'],
})

export class PffheaderComponent implements OnInit{

    isLoggedIn$: Observable<boolean>;
    constructor() {
       // this.isLoggedIn$ = authService.isLoggedIn2();
        //console.log("at constructor header>> "+ this.isLoggedIn$);
    }

    items: NbMenuItem[] = [
        {
            title: 'home',
            link: '/auth/login'
        },
        {
            title: 'dashboard',
            link: 'dashboard'
        }
    ];

    ngOnInit() {
        //this.isLoggedIn$ = this.authService.isLoggedIn2();
        //console.log("at ngOnInit header>> "+ this.isLoggedIn$);
        // this.authService.getEmitter().subscribe((customObject) => {
        //   console.log("Component is notified of successfull login!");
        // });

        //this.isLoggedIn$ = this.authService.getIsLoggedIn; // {2}
        //this.authService.IsLoggedIn.subscribe(value => console.log("at header>> "+ value));
    }

    onLogout() {
        //this.authService.logout();
    }

    // public setTitle( newTitle: string) {
    //     this.titleService.setTitle( newTitle );
    // }
}
