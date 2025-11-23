import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { TeacherListModel, UpdateTeacherClassModel, UpdateTeacherSubjecModel} from '../../../Models/TeacherModel';
import { SubjectService } from '../../../Services/Subject/subject.service';
import { ClassGService } from '../../../Services/ClassG/class-g.service';

@Component({
  selector: 'app-teacher-info',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MaterialModuleModule],
  templateUrl: './teacher-info.component.html',
  styleUrl: './teacher-info.component.css'
})
export class TeacherInfoComponent implements OnInit {
  isAddClassSectionVisible = false;
  isAddSubjectSectionVisible = false;
  errorMessage: any;
  errorMessageClass: any;

  paramsubscription?: Subscription;
  id: string | null = null;
  teacherModel: TeacherListModel = {
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
  addclass: UpdateTeacherClassModel = {
    ClassGIds: []
    
  };
  addsub: UpdateTeacherSubjecModel = {
  
    SubjectIds: []
  };
  classAndSSubjectList: any;
  subjectlist: any;
  TeacherclassAndSSubjectList: any;
  subjectList: any;
  classGList: any;


  constructor(private route: ActivatedRoute,
    private teacherService: TeacherService,
    private classService: ClassGService,
    private subjectservice: SubjectService) { }

  ngOnInit(): void {
   
    this.paramsubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          // Fetch teacher info by id
          this.teacherService.getTeacherById(this.id).subscribe({
            next: (response) => {
              this.teacherModel = response as TeacherListModel;
              let branchId = this.teacherModel.bId;
              console.log(`Fetched teacher info:`, this.teacherModel);
             
    //           //get classes
 this.getteacherclassesandSubjecTeacherId();
    this.getAllteacherclassesandSubjectByBid();
    this.getSubjectsByBid();
    this.lllllllllllllllllllll();

            },
            error: (err) => {
              console.error(`Error fetching teacher info:`, err);
            }
          });

       
        }
      }
    });
    

  }



  // addTeacherClass() {
  //   // Check if class IDs are already in the teacher's class list
  //   if (this.teacherModel.classNames.some(classGroup => this.addclass.ClassGIds.includes(classGroup.id))) {
  //     this.errorMessage = 'Classes already assigned to the teacher.';
  //     this.errorMessageClass = 'btn btn-outline-danger text-danger bg-white';
  //     return;
  //   }
  //   if (this.id) {
  //     this.teacherService.updateTClass(this.id, this.addclass).subscribe({
  //       next: (response) => {
  //         this.errorMessage = 'Classes added successfully.';
  //         this.errorMessageClass = 'btn btn-outline-success text-success bg-white';
  //         console.log(`Successfully updated teacher classes:`, response);
         
  //  this.ngOnInit(); // Refresh the component to reflect changes
  //         console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
  //       }
  //     });
  //   } else {
  //     console.error('Teacher ID is null. Cannot update teacher groups.');
  //   }
  
  // }
   addsubjectdue(sid:any){
    this.errorMessage ='';
  // Check if sid  is already in the TeacherclassAndSSubjectList list
  if (this.TeacherclassAndSSubjectList.some((tcs: any) => tcs.id === sid)) {
    console.log(`Subject ${sid} is already assigned to the teacher.`);
    this.errorMessage = 'Subject already assigned to the teacher.';
    return;
  }
  if (this.id) {
    console.log(`zzzzzzzzzzzzzzzzzzzzz:`, sid,this.id);
    this.teacherService.updateTClass(sid,this.id ).subscribe({
      next: (response) => {
        
        this.errorMessage = 'Classes added successfully.';
        this.errorMessageClass = 'btn btn-outline-success text-success bg-white';
        console.log(`Successfully updated teacher classes:`, response);
        this.ngOnInit(); // Refresh the component to reflect changes
      },
      error: (err) => {
        console.error(`Error updating teacher classes:`, err);
      }
    });
  } else {
    console.error('Teacher ID is null. Cannot update teacher groups.');
  }
}
  addTeacherSubject() {
    //Check if subject IDs are already in the teacher's subject list
     if (this.teacherModel.subjectNames.some(subject => this.addsub.SubjectIds.includes(subject.id))) {
       this.errorMessage = 'Subjects already assigned to the teacher.';
       this.errorMessageClass = 'btn btn-outline-danger text-danger bg-white';
       console.error('Some subjects are already assigned to the teacher.');
       return;
     }
    if (this.id) {
      this.teacherService.updateTSubject(this.id, this.addsub).subscribe({
        next: (response) => {
          this.errorMessage = 'Subjects added successfully.';
          this.errorMessageClass = 'btn btn-outline-success text-success bg-white';
          this.ngOnInit(); // Refresh the component to reflect changes
         
        },
        // error: (err) => {
        //   console.error(`Error updating teacher groups:`, err);
        // }
      });
    } else {
      console.error('Teacher ID is null. Cannot update teacher groups.');
    }
    
  }

  //delete class from teacher
  deleteClassFromTeacher(subclassId: string) {
    if (this.id) {
      const teacherId = this.id;
      this.teacherService.deleteClassfromTeacher(subclassId).subscribe({
        next: (response) => {
       
          this.ngOnInit(); // Refresh the component to reflect changes
        
          // Optionally, refresh the class list or handle UI updates here
       
      }
      });
    } else {
      console.error('Teacher ID is null. Cannot delete class from teacher.');
    }
    console.log("d2d2d2d2d2d2d2d2d2");
   //this.ngOnInit(); // Refresh the component to reflect changes
  }

  //delete subject from teacher
  deleteSubjectFromTeacher(subjectId: string) {
    if (this.id) {
      const teacherId = this.id;
      this.teacherService.deleteSubjectfromTeacher(teacherId, subjectId).subscribe({
        next: (response) => {
          this.ngOnInit(); // Refresh the component to reflect changes
          console.log(`Successfully deleted subject ${subjectId} from teacher:`, response);
          // Optionally, refresh the subject list or handle UI updates here
        }
      });
    } else {
      console.error('Teacher ID is null. Cannot delete subject from teacher.');
    }
    // console.log("ddddddddddddddddddddddddddddddddddddddddddddd");
    // this.ngOnInit();
  }
  getAllteacherclassesandSubjectByBid(){         //get classes
              this.teacherService.getAllClassAndSubjectByBid(this.teacherModel.bId).subscribe({
      
      next: (response) => {
        this.classAndSSubjectList = response;
        
        console.log(`Fetched classes for branch ${this.teacherModel.bId}:`, response);
      },
      error: (err) => {
        console.error(`Error fetching classes for branch ${this.teacherModel.bId}:`, err);
      }
    });
  }
  getteacherclassesandSubjecTeacherId(){         //get classes
              this.teacherService.getClassAndSubjectByTeacherId(this.teacherModel.id).subscribe({

      next: (response) => {
        this.TeacherclassAndSSubjectList = response;
        
        console.log(`Fetched classes for branch ${this.teacherModel.bId}:`, response);
      },
      error: (err) => {
        console.error(`Error fetching classes for branch ${this.teacherModel.bId}:`, err);
      }
    });
  }
  getSubjectsByBid(){
    this.subjectservice.getSubjectsByBranch(this.teacherModel.bId).subscribe({
      next: (response) => {
        this.subjectList = response;
        console.log(`Fetched subjects for branch ${this.teacherModel.bId}:`, response);
      },
      error: (err) => {
        console.error(`Error fetching subjects for branch ${this.teacherModel.bId}:`, err);
      }
    });
  }

  lllllllllllllllllllll(){ 
      this.classService.getClassesByBranch(this.teacherModel.bId).subscribe({
        next: (classGroups: any) => {
          this.classGList = classGroups;
          console.log('Class groups fetched successfully:ooooooooooooooooooooooo', classGroups);
        },
        error: (error: any) => {
          console.error('Error fetching class groups:', error);
        }
      });}

showAddSubjectSection() {
this.isAddSubjectSectionVisible = true;
}
closeshowAddSubjectSection() {
this.isAddSubjectSectionVisible = false;
}
showAddClassSection() {
this.isAddClassSectionVisible = true;
}
closeshowAddClassSection() {
this.isAddClassSectionVisible = false;
}

}
