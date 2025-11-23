import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../Services/Organization/organization.service';
import { BranchService } from '../../../Services/Branch/branch.service';
import { OrganizationList } from '../../../Models/OrganizationModels';
import { BranchList } from '../../../Models/BranchModels';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  id: string = 'b54396fa-b9a5-4db1-8729-08dd2829c9f0';

  getModel: OrganizationList;
  getBranchesModel: any ;
  constructor(private orgnizationService: OrganizationService, private branchService: BranchService) { 
    this.getModel = {
      mainphoto: '',
      name: ''
    };
    this.getBranchesModel = {
      id: '',
      name: '',
      mainPhoto: '',
      addedBy: '',
      address: '',
      infoEmail: '',
      phone: '',
      website: '',
      location: '',
      organizationId: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      youtubeUrl: '',
      linkedinUrl: '',
      snapchatUrl: '',
      whatsappUrl: '',
      telegramUrl: '',
      googleUrl: '' 
    }
    
  }
    ngOnInit(): void {
      this.orgnizationService.getOrganizationById(this.id).subscribe({
        next: (response) => {
          this.getModel = response;
          console.log(response);
        }
      });
      this.branchService.getAllBranches()
        .subscribe({
          next: (response:any) => {
            this.getBranchesModel = response;
            console.log(response);
          }
        });
      
  }
 



}
