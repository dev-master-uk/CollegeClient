import { Component, OnInit } from '@angular/core';
import { GeneralMessageService } from '../../../../Services/GeneralMessage/general-message.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { ActivatedRoute } from '@angular/router';
import { GeneralMessageAddModel } from '../../../../Models/GMessageModels';
import { TeacherService } from '../../../../Services/Teacher/teacher.service';

@Component({
  selector: 'app-add-general-message',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MaterialModuleModule],
  templateUrl: './add-general-message.component.html',
  styleUrl: './add-general-message.component.css'
})
export class AddGeneralMessageComponent implements OnInit {
  TeacherclassAndSSubjectList: any;

  message: GeneralMessageAddModel;
  errorMessage: any;
    errorMessageClass: any;
    id: string | null = null;
    classesvisible = false;

    paramsubscription?: Subscription;
availableClasses: any;
  constructor(private generalMessageService: GeneralMessageService,private route: ActivatedRoute,private teacherService: TeacherService) {
    this.message = {
      content: '',
      name: '',
      addedBy: '',
      bId: '',
      classIds: []
    };
   }

  ngOnInit(): void {
    this.paramsubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.teacherService.getteacherById(this.id).subscribe({
            next: (res: any) => {
              this.message.addedBy = res.name;
              this.message.bId = res.bId;
              console.log('Teacher info:', res);
              this.getteacherclassesandSubjecTeacherId();
            },
            error: (err) => {
              console.error(`Error fetching teacher info:`, err);
            }
          });
        }
      }
    });
  }

  sendGeneralMessage() {
    this.generalMessageService.sendMessage(this.message).subscribe(response => {
      console.log('Message sent:', this.message);
    });
  }


   getteacherclassesandSubjecTeacherId(){ 
    if(this.id)        //get classes
              this.teacherService.getClassAndSubjectByTeacherId(this.id).subscribe({

      next: (response) => {
        this.TeacherclassAndSSubjectList = response;
        
        console.log(`Fetched classes for branch:`, response);
      },
      error: (err) => {
        console.error(`Error fetching classes for branch :`, err);
      }
    });
  }

  toggleClassesVisibility() {
  this.classesvisible = !this.classesvisible;

}
}
