import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';
import { User } from '../../../Models/AuthModels';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../../Services/Branch/branch.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-branch-home',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './branch-home.component.html',
  styleUrl: './branch-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchHomeComponent implements OnInit {

  user?: User;
  mkmk?: string;
  paramsSubscription?: Subscription;
  branchModel: any; 
  id: any;
  idd: string = 'e4ac2b3c-8402-4417-d0cf-08dd2835ce47';
    gridModel: any;
  model: any
  constructor(private authService: AuthService, private brImgService: BranchImgService,
    private route: ActivatedRoute, private brancService: BranchService) { }
  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.mkmk = this.user?.id;


    //
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {

        }
      }
    });
    //
    this.brancService.getBranchById(this.id)
      .subscribe({
        next: (response: any) => {
          this.branchModel = response;
          console.log(this.branchModel)
        }
      });
    //get Grid

    this.brImgService.getByIdandTypeGrid(this.idd)
      .subscribe({
        next: (response) => {

          this.model = response;
          console.log('lllllll', this.model);
         
        }
      });
  }
}
