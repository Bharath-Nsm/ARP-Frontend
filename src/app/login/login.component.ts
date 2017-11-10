import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [],
})
export class LoginComponent implements OnInit {

    login = {email: ''};

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    onSubmitLogin() {
     this.router.navigate(['/request']);   
    }

}
