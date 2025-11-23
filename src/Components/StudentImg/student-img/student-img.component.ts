import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentImgService } from '../../../Services/StudentImg/student-img.service';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-img',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-img.component.html',
  styleUrl: './student-img.component.css'
})
export class StudentImgComponent implements OnInit {

  stImgF: File | null = null;
  addModel: FormGroup;
  responseMessage: any;
  studentImgList: any;
  user?: User;
  id: any;
  paramsSubscription?: Subscription;
  imgpr: any;
  idd: any;
    getModel: any;

  constructor(private route: ActivatedRoute, private studentImgService: StudentImgService, private fb: FormBuilder, private authService: AuthService) {

    this.addModel = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      studentId: ['', Validators.required],
      addedBy: ['', Validators.required],
      bId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.addModel.patchValue({ addedBy: this.user?.username });
    this.addModel.patchValue({ bId: this.user?.branchId });

  

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.addModel.patchValue({ studentId: this.id });

          this.studentImgService.getStudentImgByStIdandType(this.id).subscribe({
            next: (response) => {
              this.imgpr = response;
              console.log(this.imgpr);
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      }
    });
  }


  onFileSelect(event: Event, fileType: 'StImgF'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'StImgF') {
        this.stImgF = input.files[0];
      }
    }
  }

  onSubmit() {
    if (this.addModel.invalid || !this.stImgF) {
      return;
    }
    const model = this.addModel.value;
    this.studentImgService.uplouploadStudentImg(model, this.stImgF).
      subscribe({
        next: (response) => {
         
          alert('Image uploaded successfully!');
          this.responseMessage = 'Image successfully added.';
          this.getModel = response
          console.log("mmmmmmmmmm",response);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload Image.');
          this.responseMessage= 'Failed to add Image.';
          console.log(model);
        },
      });
  }

  //get studeniImg

  getStudentImg() {
    this.studentImgService.getStudentImg().subscribe({
      next: (response) => {
        console.log(response);
        this.studentImgList= response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  




}
