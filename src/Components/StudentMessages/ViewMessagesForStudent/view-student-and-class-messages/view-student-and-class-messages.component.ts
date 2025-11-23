import { Component, OnInit } from '@angular/core';
import { User } from '../../../../Models/AuthModels';
import { AuthService } from '../../../../Services/Auth/auth.service';
import { MessageService } from '../../../../Services/Message/message.service';
import { StudentService } from '../../../../Services/Student/student.service';
import { CommonModule } from '@angular/common';
import { GeneralMessageService } from '../../../../Services/GeneralMessage/general-message.service';



@Component({
  selector: 'app-view-student-and-class-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-student-and-class-messages.component.html',
  styleUrl: './view-student-and-class-messages.component.css'
})
export class ViewStudentAndClassMessagesComponent implements OnInit {

user:User | undefined;
  message: any;
  messages: any;
  student: any;
isStudentMessageVisible: boolean = true;
isGeneralMessageVisible: boolean = false;
  count: any;
  classmessages: any;
  classData: any;
  classMessage: any;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private studentService: StudentService,
    private generalMessageService: GeneralMessageService
  ) { }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getstudentById();
    
   
    

   
  
  }

  getClassByStudentAndYear(){ 
     this.studentService.getClassByStudentAndYear(this.student.id).subscribe((classData:any) => {
        this.classData=classData;
        this.loadClassMessages();
        console.log('Class ID:', this.classData);
        
      });
  }
  getstudentById() {
    if (this.user) {
      this.studentService.getStudentByUserId(this.user.id).subscribe(student => {
        this.student=student;
         this.loadMessages();
         this.getClassByStudentAndYear();
        console.log(this.student);
      });  
    }
   
  }

  loadMessages(): void {
    if (this.user) {
      this.messageService.getMessagesByStudentId(this.student.id).subscribe(messages => {
        this.messages=messages;
        this.countUnReadMessages();
        console.log('bbbbbbbbbbbbbbbbbbbbbbb',this.messages);
        // Handle the retrieved messages
      });
    }
  }
  loadMessageById(id:string): void {
    this.messageService.getMessageById(id).subscribe(message => {
      this.message=message;
      this.updateUnreadStatus(id);
      
      // Handle the retrieved message
    });   
  }
   updateUnreadStatus(id:string): void {
    this.messageService.updateMessage(id, ).subscribe(() => {
      // Handle successful status update
      this.ngOnInit();
    });

  }
loadClassMessages(): void {
    if (this.user) {
      this.generalMessageService.getMessageByClassId(this.classData.classId).subscribe(messages => {
        this.classmessages=messages;
        this.countUnReadMessages();
        console.log('mmmmmmmmmmmmmmmmmmm',this.classmessages);
        // Handle the retrieved messages
      });
    }
  }
 

 loadClassMessageById(id:string): void {
    this.generalMessageService.getMessageById(id).subscribe(message => {
      this.classMessage=message;
      console.log(this.classMessage);
      

      // Handle the retrieved message
    });
  }

  countUnReadMessages(): void {
    if (this.user) {
      this.messageService.countUnreadMessagesMessages(this.student.id).subscribe(count => {
        this.count=count;
        console.log('Unread messages count:', count);
      });
    }
  }

  openGeneralMessagemodal() {
    if (this.isGeneralMessageVisible==false) {
      this.isGeneralMessageVisible=true;
      this.isStudentMessageVisible=false;
    }
  }
openStudentMessageModal() {
  if (this.isStudentMessageVisible==false) {
  this.isStudentMessageVisible=true;
  this.isGeneralMessageVisible=false;
  }
}

}
