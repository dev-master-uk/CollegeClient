import { Component, OnInit } from '@angular/core';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';
import { Subscription } from 'rxjs';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../../Services/Branch/branch.service';

@Component({
  selector: 'app-home-branch',
  standalone: true,
  imports: [],
  templateUrl: './home-branch.component.html',
  styleUrl: './home-branch.component.css'
})
export class HomeBranchComponent implements OnInit {
  user?: User;
  mkmk?: string;
  paramsSubscription?: Subscription;
  model: any;
  id: any;
    branchModel: any;
  constructor(private imgBranch: BranchImgService, private authService: AuthService, private route: ActivatedRoute, private branchService: BranchService) {

  }
    ngOnInit(): void {

      this.user = this.authService.getUser();
      


      //
      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {

            this.imgBranch.getByIdandTypeGrid(this.id)
              .subscribe({
                next: (response) => {
                  this.model = response;
                  console.log('kkkkkkkkk', response)
                }
              });

            this.branchService.getBranchById(this.id)
            .subscribe({
                next: (response: any) => {
                  this.branchModel = response;
                console.log(this.branchModel)
                }
              });


          }
        }
      });



    }

}
