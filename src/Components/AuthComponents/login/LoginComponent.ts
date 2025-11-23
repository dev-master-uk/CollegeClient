import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    logmodel: LoginRequest;

    constructor(private authService: AuthService,
        private cookies: CookieService,
        private router: Router) {
        this.logmodel = {
            username: '',
            password: ''
        };
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    onLoginSubmit(): void {
        this.authService.login(this.logmodel).subscribe({
            next: (response) => {
                console.log(response);
                //set auth cookie
                this.cookies.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
                //set user
            this.authService.setUser({
              id: response.id,
              branchId: response.branchId,
              email: response.email,
                    username: response.username,
                    roles: response.roles,
                    userType: response.userType
                });

                //redirect to home
            //this.router.navigate(['']);
            
            this.router.navigate(['/']);

            }
        });
    }
}
