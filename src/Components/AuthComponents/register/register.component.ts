import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Register } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BranchService } from '../../../Services/Branch/branch.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ToastrModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  hhh: string[] = [];

  res: any
  registermodel: Register
  id: string | undefined;
    branchesModel: any;
  kkkk: any;
  constructor(private authservice: AuthService, private toasr: ToastrService, private router: Router, private branchService: BranchService) {
    this.registermodel = {
      username: '',
      email: '',
      password: '',
      roles: [],
      firstName:'',
      lastName: '',
      userType: '',
      branchId: ''
    }
  }

  ngOnInit(): void {
    this.getAllBranches();
  }
  getAllBranches() {
    this.branchService.getAllBranches()
      .subscribe({
        next: (response: any) => {
          this.branchesModel = response
        }
      })
  }


   oNregister() {
    this.authservice.register(this.registermodel)
      .subscribe({
        next: (response: any) => {
          this.res = response;
          //display the error message from the server
this.kkkk='res: ' + JSON.stringify(this.res)

          console.log('rrrrrrrrrrrrrrrrrrrr', this.res);
          console.log('kkkkkkk', this.res.error);
          console.log('kkkkkkk', this.registermodel);


          // if (this.res.userType == "Student") {
          //   this.router.navigateByUrl(`/comst/${this.res.id}`);
          // }
          // else if (this.res.userType == "Teacher") {
          //   this.router.navigateByUrl(`/compteacher/${this.res.id}`);
          // }
      
          // else
          // {
          //   this.router.navigateByUrl(`/`);
          // }

          //if (this.res == 1) {
          //  this.toasr.success('1111111111', 'Toastr fun!');
          //}
          //else { this.toasr.success('000000', 'Toastr fun!'); }
        
        }
        ,
        error: (err) => {
       alert('Error occurred: ' + JSON.stringify(err));
        }

      });

  };



};
