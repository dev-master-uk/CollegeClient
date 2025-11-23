import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../Services/Message/message.service';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { GetRequest } from '../../../Models/StudentModels';
import { StudentService } from '../../../Services/Student/student.service';
import { AddMessage } from '../../../Models/MessageModels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addstudentmessage',
  standalone: true,
  imports: [ CommonModule,
    FormsModule],
  templateUrl: './addstudentmessage.component.html',
  styleUrl: './addstudentmessage.component.css'
})
export class AddstudentmessageComponent implements OnInit {
  user?: User;
  getSClasses: any;
getRequest: GetRequest;
  getStudentToMove: any;
  messageAddModel: AddMessage;
  years: any;

  constructor(private messageService: MessageService, 
    private authService: AuthService,
    private classService: ClassGService,
  private studentService: StudentService) { 
        this.getRequest = {
      yearId: '',
      classId: ''
    };
    this.messageAddModel = {
      content: '',
      name: '',
      addedBy:  '', // Replace 'username' with the correct property from User
      bId:  '', // Replace 'branchId' with the correct property from User,
      studentIds: []
    }
  }

  ngOnInit(): void {
this.user = this.authService.getUser();
this.getClasses();
 this.getAllyears();

  }

   getClasses() {
    if (this.user?.branchId) {
      this.classService.getClassesByBranch(this.user.branchId).subscribe({
        next: (response: any) => {
          this.getSClasses = response;
         
          console.log(this.getSClasses)
      
        }
      });
    } else {
      console.error('branchId is undefined');
    }
  }
    getStudentToMoveM() {
      console.log('getRequest',this.getRequest)
      this.studentService.GetStudentsByClassIdYearId(this.getRequest).subscribe({
        next: (response: any) => {
          this.getStudentToMove = response;
          console.log('ssssssssssssssssssssssssss',this.getStudentToMove)
        }
      });
    }
sendMessage() {
  if (this.getStudentToMove) {
    this.messageAddModel.addedBy = this.user?.username || '';
    this.messageAddModel.bId = this.user?.branchId || '';
    this.messageService.createMessage(this.messageAddModel).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  } else {
    console.error('No student selected to send message');
  }
}
  getAllyears() {
    this.studentService.getYears().subscribe({
      next: (response: any) => {
        this.years = response;
        console.log(this.years)

      }
    });
  }
}