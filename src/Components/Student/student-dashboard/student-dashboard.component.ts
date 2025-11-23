import { Component, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { CommonModule, NgClass } from '@angular/common';
import { User } from '../../../Models/AuthModels';
import { Subscription } from 'rxjs';
import { StudentImgStId } from '../../../Models/StudentImgModels';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
import { StudentService } from '../../../Services/Student/student.service';
import { StudentImgService } from '../../../Services/StudentImg/student-img.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [MaterialModuleModule, NgClass,RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
 user: User={id:'',username:'',email:'',roles:[],branchId:'', userType:''};

  studentModel: any;
  isphotoModalVisible: boolean=false;
  isVideoLessonsModalVisible: boolean = false;
  isDiseasesModalVisible: boolean = false;
  isAttendanceModalVisible: boolean = false;
  isAddLevelModalVisible: boolean = false;
  

  profileImg: any;
  iid?: string;
  gallary: any;
  stId: StudentImgStId;
videoLessons: any;
 

  constructor(
      private studentService: StudentService,
      private authService: AuthService,
      
      private router: Router,
      private studentImgService: StudentImgService,
   ) {
      this.stId = {
        studentId: ''
      }
    }
  ngOnInit(): void {
   this.user = this.authService.getUser() ?? {id:'',username:'',email:'',roles:[],branchId:'',userType:''};
  
   console.log('ssssssssssssssssssssssssssssssssssssssssss',this.user);
   if(this.user.userType !== 'Student'  ){
    console.log('You are not authorized to access this page');
// this.router.navigate(['/']);
   }
this.studentService.getStudentByUserId(this.user.id).subscribe(
  (response) => {
    this.studentModel = response;
    console.log(this.studentModel);
   if(this.studentModel){

 this.studentImgService.getStudentImgByStIdandType(this.studentModel.id).subscribe(
(response) => {
    this.profileImg = response;
  }
 );
   
 this.studentImgService.getStudentImgByStudentId(this.studentModel.id)
              .subscribe({
                next: (response) => {

                  this.gallary = response;
                  console.log(this.gallary);
                },
                error: (err) => {
                  console.error(err);
                },
              });
}
   });
   //console.log('ffffffffffffffffffffffffff',this.stId.studentId);

  

// console.log('eeeeeeeeeeeeeeeeeeeeee',this.stId.studentId);
 

}
   openphotomodal() {
    this.isphotoModalVisible = true;
  }
  closephotomodal() {
    this.isphotoModalVisible = false;
  } 

  openVideoLessonsModal() {
    this.isVideoLessonsModalVisible = true;
  }
  closeVideoLessonsModal() {
    this.isVideoLessonsModalVisible = false;
} 


  openDiseasesmodal() {
    this.isDiseasesModalVisible = true;
  }
  closeDiseasesmodal() {
    this.isDiseasesModalVisible = false;
} 

  openAttendancemodal() {
    this.isAttendanceModalVisible = true;

}
  closeAttendancemodal() {
    this.isAttendanceModalVisible = false;
} 
}
