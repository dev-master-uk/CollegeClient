import { Component } from '@angular/core';
import { ChangePasswordModel } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  model: ChangePasswordModel

  constructor(private authservice: AuthService) {
    this.model = {
      username: '',
      password: '',
      newpassword: ''
    }
  }

  oNchangepassword() {
    this.authservice.changePassword(this.model).
      subscribe({
        next: (response) => {
          console.log(response)
        }
      })
  }
}
