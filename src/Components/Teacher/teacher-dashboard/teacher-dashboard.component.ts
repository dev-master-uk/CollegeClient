import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { ActivatedRoute } from '@angular/router';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { SubjectService } from '../../../Services/Subject/subject.service';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { TeacherListModel } from '../../../Models/TeacherModel';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MaterialModuleModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {
  user: User | undefined;
  teacherModel:TeacherListModel ;
  teacherbyuserModel: any;
  // Add any necessary properties or methods for the teacher dashboard here

  constructor(private route: ActivatedRoute,
      private teacherService: TeacherService,
      private classGservice: ClassGService,
      private subjectservice: SubjectService,
    private authService: AuthService
    ) { 
      this.teacherModel = {
    id: '',
    departmentName: '',
    email: '',
    imgPath: '',
    jopDescription: '',
   subjectNames: [],
    
    title: '',
    addedBy: '',
    name: '',
    bId: ''
      };
    }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    
      console.log(`User ID: ${this.user?.id}`);
      this.teacherService.getTeachersByUserId(this.user?.id).subscribe({
        next: (response) => {
          this.teacherbyuserModel = response;
          console.log(`teacherbyuserModel by user ID:` ,this.teacherbyuserModel.id,  this.teacherbyuserModel,'mmmmmmmmmmmmmmmmm');
          console.log(`Fetched teachers for user ${this.user?.id}:`,this.teacherbyuserModel.id);
         this.getTeacherModel();
        },
        error: (error: any) => {
          console.error('Error fetching teachers:', error);
        }
      });
       
    
}
  getTeacherModel() {
        this.teacherService.getTeachersByBid(this.teacherbyuserModel.id).subscribe({
                next: (response) => {
                this.teacherModel = response  as TeacherListModel;
                let branchId = this.teacherModel.bId;
                console.log(`Fetched teacher info:`, this.teacherModel);
        },
        error: (error: any) => {
          console.error('Error fetching class groups:', error);
        }
      });
  }

}
