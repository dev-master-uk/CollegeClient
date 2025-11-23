import { Component, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../Models/AuthModels';
import { Subscription } from 'rxjs';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { DepartmentService } from '../../../Services/Department/department.service';

@Component({
  selector: 'app-coplete-teacher-acount',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule],
  templateUrl: './coplete-teacher-acount.component.html',
  styleUrl: './coplete-teacher-acount.component.css'
})
export class CopleteTeacherAcountComponent implements OnInit {

  user?: User;
  id: any;
  paramsSubscription?: Subscription;
  teacherUpdToComModel: FormGroup;
    tImgF?:File;
    responseMessage?:string;
  getModel: any;
    getTeacher: any;
    departmentList: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private teacherService: TeacherService, private departmentService: DepartmentService) {
    this.teacherUpdToComModel = this.fb.group({
      "title": [""],
      "jopDescription": [""],
      "departmentId": [""],
      "updatedBy": [""],
    })
  }
    ngOnInit(): void {
      this.user = this.authService.getUser();
      this.teacherUpdToComModel.patchValue({ updatedBy: this.user?.username });
      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
            this.teacherService.getTeachersByUserId(this.id).subscribe({
              next: (response: any) => {
                this.getTeacher = response;
              }
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
        }
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

  updateTeacherToComp(id: string) {
    if (this.teacherUpdToComModel.invalid || !this.tImgF) {
      return;
    }
    const model = this.teacherUpdToComModel.value;
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

}
