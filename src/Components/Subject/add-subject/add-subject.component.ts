import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddSubjectModel } from '../../../Models/SubjectModels';
import { DepartmentService } from '../../../Services/Department/department.service';
import { SubjectService } from '../../../Services/Subject/subject.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { Subscription } from 'rxjs';

import { ClassGService } from '../../../Services/ClassG/class-g.service';


@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent implements OnInit {
addSubjectModel: FormGroup;
isvideoModalVisible: any;
responseMessage: any;
  departmentList: any;
  user?:User;
  teacherList: any;
  classGList: any;
  id: any;
  subscription?: Subscription;
  classGSubjectList: any;
constructor(
  private departmentService: DepartmentService,
  private subjectService: SubjectService,
  private fb: FormBuilder,
  private authService: AuthService,
  private classService: ClassGService
) {
  this.addSubjectModel = this.fb.group({
   name: this.fb.control('', { validators: [Validators.required] }),
   addedBy: this.fb.control(''),
   bId: this.fb.control(''),
   departmentName: this.fb.control('', { validators: [Validators.required] }),
   classGIds: this.fb.control([], { validators: [Validators.required] })
  });
}
  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.departmentService.getDepartmentsByBidId(this.user?.branchId).subscribe({
      next: (departments: any) => {
        this.departmentList = departments;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
 
    if (this.user?.branchId) {
      this.classService.getClassesByBranch(this.user.branchId).subscribe({
        next: (classGroups: any) => {
          this.classGList = classGroups;
          console.log('Class groups fetched successfully:ooooooooooooooooooooooo', classGroups);
        },
        error: (error: any) => {
          console.error('Error fetching class groups:', error);
        }
      });
        this.classService.getClassesByBranchdisplaysubject(this.user.branchId).subscribe({
        next: (classSubject: any) => {
          this.classGSubjectList = classSubject;
          console.log('Class subjects fetched successfully:kkkkkkkkkkkkkkkkkk', classSubject);
        },
        error: (error: any) => {
          console.error('Error fetching class subjects:', error);
        }
      });
    }
  }

onSubmit() {
  if (this.addSubjectModel.invalid) {
    this.responseMessage = 'Please fill in all required fields.';
    return;
  }
  const model = this.addSubjectModel.value;
  model.addedBy = this.user?.id; // Set the addedBy field to the current user's ID
  model.bId = this.user?.branchId; // Set the bId field to the current user's branchId
  console.log('Form Data:', model);
  this.subjectService.addSubject(model).subscribe({
    next: (response:any) => {
      this.responseMessage = 'Subject added successfully!';
      this.ngOnInit();
    },
    error: (error:any) => {
    this.responseMessage = 'Error adding subject.';
  }
});

}

}
