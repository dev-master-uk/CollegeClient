import { Component, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MaterialModuleModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  user?: User;
    email: any;
  constructor(private authService: AuthService,
    private router: Router) { }
    ngOnInit(): void {
      this.authService.user()
        .subscribe({
          next: (response) => {
            this.user = response;
          }
        });
      this.user = this.authService.getUser();
      this.email = this.user?.email
      this.ngOnInit();
  };
  onlogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  };

}
