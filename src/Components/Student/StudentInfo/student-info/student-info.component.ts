import { Component, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { StudentService } from '../../../../Services/Student/student.service';
import { User } from '../../../../Models/AuthModels';
import { AuthService } from '../../../../Services/Auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { StudentImgService } from '../../../../Services/StudentImg/student-img.service';
import { StudentImgStId } from '../../../../Models/StudentImgModels';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [MaterialModuleModule, NgClass],
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.css'
})
export class StudentInfoComponent implements OnInit {

  user?: User;
  paramsSubscription?: Subscription;
  id: string | null = null;
  studentModel: any;
  isphotoModalVisible: boolean=false;
  isDocumentsModalVisible: boolean = false;
  isDiseasesModalVisible: boolean = false;
  isAttendanceModalVisible: boolean = false;
  profileImg: any;
  iid?: string;
  gallary: any;
  stId: StudentImgStId;
isAddLevelModalVisible: any;
  //iid: any;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private studentImgService: StudentImgService) {
    this.stId = {
      studentId: ''
    }
  }
    ngOnInit(): void {
      this.user = this.authService.getUser();

      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
            this.studentService.getStudentById(this.id).subscribe({
              next: (response: any) => {
                this.studentModel = response;

                console.log(response);
              }
            });
            this.studentImgService.getStudentImgByStIdandType(this.id).subscribe({
              next: (response) => {

                this.profileImg = response;
                console.log(this.profileImg);
              },
              error: (err) => {
                console.error(err);
              },
            });
            this.studentImgService.getStudentImgByStudentId(this.id)
              .subscribe({
                next: (response) => {

                  this.gallary = response;
                  console.log(this.gallary);
                },
                error: (err) => {
                  console.error(err);
                },
              });

            this.stId.studentId = this.id;
          }
        }
      });
    
  }

  changeProfileImg(id: string) {
    this.studentImgService.changeprfilephoto(id, this.stId)
    .subscribe({
      next: (response) => {
this.ngOnInit();
        console.log("pppppppp", this.stId);
      },
      error: (err) => {
        console.error(err);
      },
    });


    
  }

  openphotomodal() {
    this.isphotoModalVisible = true;
  }
  closephotomodal() {
    this.isphotoModalVisible = false;
  } 

  openDocumentsmodal() {
    this.isDocumentsModalVisible = true;
  }
  closeDocumentsmodal() {
    this.isDocumentsModalVisible = false;
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
