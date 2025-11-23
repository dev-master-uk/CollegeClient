import { Component, OnInit } from '@angular/core';
import { AddRole } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usersandroles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usersandroles.component.html',
  styleUrl: './usersandroles.component.css'
})
export class UsersandrolesComponent implements OnInit {

  rolesname: any
  users?: any
  roles?: any
  addrole: AddRole;
  constructor(private authservise: AuthService) {
    this.addrole = {
      role: ''
    }
  }
  ngOnInit(): void {

 
    this.authservise.getusers().subscribe({
      next: (response) => {
        console.log(response)
        this.users = response
      }
    })
    this.authservise.getAllRoles().subscribe({
      next: (response) => {
        console.log(response)
        this.roles = response
      }
    })

  }
  onaddrole(id: string) {

    this.authservise.addRoles(id, this.addrole).subscribe({
      next: (response) => {
        console.log(response)

        this.ngOnInit();
      }
    })
  }
  onchange(name: string) {
    this.addrole.role = name
    console.log(this.addrole.role)
    this.ngOnInit();
  }

   delete(id: string) {
     this.authservise.deleteUser(id).subscribe({
       next: (response) => {
         alert('jjjjjjjjjj')
         console.log(response)
         this.ngOnInit();
       }
     })
  };


}

