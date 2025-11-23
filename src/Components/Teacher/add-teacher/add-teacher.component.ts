import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../../Services/Department/department.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {
  addModel: FormGroup;
  user?: any;
  id: any;
  paramsSubscription?: Subscription;
    departmentList: any;
  rolesList: any;
    tImgF?: File;
    responseMessage?: string;
    getModel: any;
    teacherList: any;
  constructor(private route: ActivatedRoute, private departmentService: DepartmentService,
    private teacherService: TeacherService, private fb: FormBuilder, private authService: AuthService) {

    this.addModel = this.fb.group({
      title: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      jopDescription: ['', Validators.required],
      departmentId: ['', Validators.required],
      roles: ['', Validators.required],
      addedBy: ['', Validators.required],
      branchId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.addModel.patchValue({ addedBy: this.user?.username });
    this.addModel.patchValue({ branchId: this.user?.branchId });
    //get roles
    this.authService.getAllRoles().subscribe({
      next: (response) => {
        console.log(response)
        this.rolesList = response
      }
    })
    

    this.teacherService.getTeachersByBid(this.user?.branchId).subscribe({
            next: (response:any) => {
              this.teacherList = response;
        console.log(this.teacherList);
            },
            error: (err:any) => {
              console.error(err);
            },
          });

          this.departmentService.getDepartments().subscribe({
            next: (response) => {
              this.departmentList = response;
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      
   
 


  onFileSelect(event: Event, fileType: 'TImgF'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'TImgF') {
        this.tImgF = input.files[0];
      }
    }
  }

  onSubmit() {
    if (this.addModel.invalid || !this.tImgF) {
      return;
    }
    const model = this.addModel.value;
    this.teacherService.addTeacher(model, this.tImgF).
      subscribe({
        next: (response) => {

          alert('Image uploaded successfully!');
          this.responseMessage = 'Image successfully added.';
          this.getModel = response
          console.log("mmmmmmmmmm", response);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload Image.');
          this.responseMessage = 'Failed to add Image.';
          console.log(model);
        },
      });
  }

  //get studeniImg

  }










