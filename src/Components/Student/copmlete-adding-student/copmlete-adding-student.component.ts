import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, NgForm, FormControl } from '@angular/forms';

import { StudentService } from '../../../Services/Student/student.service';
import { StudentListModel, StudentUpdToCompleteModel } from '../../../Models/StudentModels';
import { Subscription } from 'rxjs';
import { User } from '../../../Models/AuthModels';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { ChronicDiseaseService } from '../../../Services/ChronicDisease/chronic-disease.service';
import { LevelService } from '../../../Services/Level/level.service';
import { ClassGService } from '../../../Services/ClassG/class-g.service';

@Component({
  selector: 'app-copmlete-adding-student',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MaterialModuleModule,NgxSpinnerModule],
  templateUrl: './copmlete-adding-student.component.html',
  styleUrl: './copmlete-adding-student.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopmleteAddingStudentComponent implements OnInit, OnDestroy {
  studentForm: FormGroup;
  
  paramsSubscription?: Subscription;
  user?: User;
  id: string | null = null;
  getall: any;
  UnCompletedModel: StudentListModel[] = [];
  mid: any;  
  mk: any;
  chronicDiseaseList:any
  classList:any
  levelList: any;
    levelId: any;
    brid: string | undefined;
 mkmk:any
  responseMessage: any;
  constructor(
    private fb: FormBuilder, private studentService: StudentService,
    private route: ActivatedRoute, private authService: AuthService,
    private chronicDiseasesService: ChronicDiseaseService,
    private levelService: LevelService,
    private classService: ClassGService) {
    this.studentForm = this.fb.group({
      "midName": [""],
      "phone": [""],
      "address": [""],
      "birthDate": [""],
      "gender": [""],
      "fGuardianName": [""],
      "fGuardianPhone": [""],
      "fGuardianEmail": [""],
      "fGuardianAddress": [""],
      "fGuardianRelation": [""],
      "sGuardianName": [""],
      "sGuardianPhone": [""],
      "sGuardianEmail": [""],
      "sGuardianAddress": [""],
      "sGuardianRelation": [""],
      "medicalReport": [""],
      "bloodGroup": [""],
      "addedBy":[""],
      "bid": [""],
      // for list of classes and chronic diseases



      "classIds": [""],
      "chronicDiseaseIds": [""],
      "yearId":[""]
    });
  }

  ngOnInit(): void {
    this.getchronicDiseaseforSelect();
    this.user = this.authService.getUser();
    //mk=user.branchId
    this.brid = `${this.user?.branchId}`
    //getlevelsBy user.branchId
    
    this.levelService.getLevelsbyBranch(this.brid).subscribe({
      next: (response: any) => {
        this.levelList = response;
        console.log(this.levelList)
        console.log('mmmmmmmkkkkkkkkkk',this.brid)

      }
    });
  

      // set user.branchId to the bid field
      this.studentForm.patchValue({ bid: this.user?.branchId });
    // set user.username to the addedBy field
    this.studentForm.patchValue({ addedBy: this.user?.username });
    this.studentForm.patchValue({ yearId: "E212B045-64DE-4692-1CB7-08DD24EDE008" });
    



      this.getUnCompletedStudent();
      // convert data from datepicker to date only
      this.studentForm.get('birthDate')?.valueChanges.subscribe((value) => {
        this.studentForm.patchValue({ birthDate: new Date(value).toISOString().split('T')[0] });
      }
      );

      //Get total
      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
             //get the data from the API for this category Id
            this.studentService.getStudentByUserId(this.id).subscribe({
              next: (response: any) => {
                this.getall = response;
                console.log(this.getall)

                this.studentForm.patchValue({ midName: this.getall.midName });
                this.studentForm.patchValue({ phone: this.getall.phone });
                this.studentForm.patchValue({ address: this.getall.address });
                this.studentForm.patchValue({ birthDate: this.getall.birthDate });
                this.studentForm.patchValue({ gender: this.getall.gender });
                this.studentForm.patchValue({ fGuardianName: this.getall.fGuardianName });
                this.studentForm.patchValue({ fGuardianPhone: this.getall.fGuardianPhone });
                this.studentForm.patchValue({ fGuardianEmail: this.getall.fGuardianEmail });
                this.studentForm.patchValue({ fGuardianAddress: this.getall.fGuardianAddress });
                this.studentForm.patchValue({ fGuardianRelation: this.getall.fGuardianRelation });
                this.studentForm.patchValue({ sGuardianName: this.getall.sGuardianName });
                this.studentForm.patchValue({ sGuardianPhone: this.getall.sGuardianPhone });
                this.studentForm.patchValue({ sGuardianEmail: this.getall.sGuardianEmail });
                this.studentForm.patchValue({ sGuardianAddress: this.getall.sGuardianAddress });
                this.studentForm.patchValue({ sGuardianRelation: this.getall.sGuardianRelation });
                this.studentForm.patchValue({ medicalReport: this.getall.medicalReport });
                this.studentForm.patchValue({ bloodGroup: this.getall.bloodGroup });

              }
            });
}
        }
      });
      this.mid = this.getall.userId
    
   
  
    

  }





  getchronicDiseaseforSelect() {
    this.chronicDiseasesService.getchronicDiseases().subscribe({
      next: (response: any) => {
        this.chronicDiseaseList = response;
        console.log(this.chronicDiseaseList)
      }
    });
  };
 
  getClassesByLevelforSelect() {
    this.classService.getClassesByLevel(this.levelId).subscribe({
      next: (response: any) => {
        this.classList = response;
        console.log(this.classList)
      }
    });
  }
  updateStudent(id: string) {
    //if (
    //  this.StFormGroup.invalid 
    //) {

    //  alert('Please fill in all fields');
    //  return;
    //}
    const addModelData: StudentUpdToCompleteModel = this.studentForm.value;
    console.log(addModelData)
   
  
    this.studentService.updateStudentToComplete(id,addModelData).subscribe({
      next: (response: any) => {
        console.log(response)
        alert('Student Added Successfully');
        this.responseMessage ='Student Added Successfully';


      },
      error: (error: any) => {
        console.log(error)
        alert('An error occurred while adding the student');
        this.responseMessage ='An error occurred while adding the student';
      }
    });
  }

  //getlevel(this.brid) {
  //  this.levelService.getLevelsbyBranch(this.brid).subscribe({
  //    next: (response: any) => {
  //      this.levelList = response;
  //      console.log(this.levelList)
  //    }
  //  });
 // }

  getUnCompletedStudent() {
    this.studentService.getAllUnCompleted().subscribe({
      next: (response: any) => {
        this.UnCompletedModel = response;
        console.log(this.UnCompletedModel)
        this.data = new MatTableDataSource(this.UnCompletedModel);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    });
  };

  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['id', 'userId', 'addedBy', 'birthDate', 'gender', 'email', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.UnCompletedModel);
  selection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  };
  


}
