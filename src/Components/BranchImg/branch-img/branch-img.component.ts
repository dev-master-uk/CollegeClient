import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../../Models/AuthModels';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-branch-img',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './branch-img.component.html',
  styleUrl: './branch-img.component.css'
})
export class BranchImgComponent implements OnInit {
  paramsSubscription?: Subscription;
  user?: User;
  id: string | null = null;
  img: File | null = null;
  addModel: FormGroup;
  responseMessage: any
  getTypeModel: any;
  constructor(private fb: FormBuilder, private branchImgService: BranchImgService, private route: ActivatedRoute, private authService: AuthService) {
    this.addModel = this.fb.group({
      name: ['', Validators.required], 
      description: ['', Validators.required], 
      type: ['', Validators.required],
      branchId: ['', Validators.required],
      addedBy: ['', Validators.required],
   
    
    });
  }
  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {


        }
      });
    this.user = this.authService.getUser();
    this.addModel.patchValue({ addedBy: this.user?.id });

      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {

         }
       }
      });
   this.addModel.patchValue({ branchId: this.id });
    this.getImgType();

    }
  onFileSelect(event: Event, fileType: 'Img'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'Img') {
        this.img = input.files[0];
      } 
    }
  }
  getImgType() {
    this.branchImgService.getImgType()
      .subscribe({
        next: (response) => {
          this.getTypeModel = response;
          console.log(response)
        }
      })
  }

  onSubmit() {
    if (this.addModel.invalid || !this.img) {
      return;
    }
    const model = this.addModel.value;
    this.branchImgService.upload(model, this.img).
           subscribe({
             next: (response) => {
               alert('Organization data uploaded successfully!');
               this.responseMessage = 'Organization successfully added.';
               console.log(response);
               console.log(model);
             },
             error: (err) => {
               console.error(err);
               alert('Failed to upload organization data.');
               this.responseMessage = 'Failed to add organization.';
               console.log(model);
             },
           });
  }
}
