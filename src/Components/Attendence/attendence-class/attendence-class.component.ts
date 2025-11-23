import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { AttendenceAddModel } from '../../../Models/AttendenceModel';
import { User } from '../../../Models/AuthModels';
import { GetRequest, StudentListModelplusclassid } from '../../../Models/StudentModels';
import { AttendenceService } from '../../../Services/Attendence/attendence.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { LevelService } from '../../../Services/Level/level.service';
import { StudentService } from '../../../Services/Student/student.service';

@Component({
  selector: 'app-attendence-class',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModuleModule, NgClass],
  templateUrl: './attendence-class.component.html',
  styleUrl: './attendence-class.component.css'
})
export class AttendenceClassComponent implements OnInit {
  user?: User;
  clId: any;
  years: any;
  getRequest: GetRequest;
  getStudentbyClass: StudentListModelplusclassid[] = [];
  getSClasses: any;
  levelModel: any;
  studentId: any;
  mmmm: any;
  addModel: AttendenceAddModel
  constructor(private classService: ClassGService, private authServise: AuthService, private attendenceService: AttendenceService, private levelService: LevelService, private studentService: StudentService) {
    this.getRequest = {
      yearId: '',
      classId: ''
    },
      this.addModel = {
      addedBy: '',
      classStudentId:[]
      }
  }
    ngOnInit(): void {
      this.user = this.authServise.getUser();
      this.addModel.addedBy = `${this.user?.username}`;
      this.getAllyears();

      this.levelService.getLevelsbyBranch(`${this.user?.branchId}`).subscribe({
        next: (response: any) => {
          this.levelModel = response;

          console.log(this.levelModel)

        }
      });

  }
  getAllyears() {
    this.studentService.getYears().subscribe({
      next: (response: any) => {
        this.years = response;
        console.log(this.years)

      }
    });
  }
  getClasses() {
    this.classService.getClassesByLevel(this.clId).subscribe({
      next: (response: any) => {
        this.getSClasses = response;
        this.ngOnInit();
        console.log(this.getSClasses)

      }
    });
  }
  getStudent() {
    this.studentService.GetStudentsByClassIdYearId(this.getRequest).subscribe({
      next: (response: any) => {
       
        this.getStudentbyClass = response;
        console.log(this.getStudentbyClass)
        console.log(response)
        this.alldata = new MatTableDataSource(this.getStudentbyClass);
        this.alldata.paginator = this.paginator;
        this.alldata.sort = this.sort;
      }
    });
  }

    displayedAllColumn: string[] = ['studentName', 'studentddress', 'studentdateofbirth', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  alldata = new MatTableDataSource(this.getStudentbyClass);
  allselection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alldata.filter = filterValue.trim().toLowerCase();
  }
  // ggg
  // Object to store selected student IDs
  selectedStudents: { [key: string]: boolean } = {};

  // Function to handle checkbox change
  onCheckboxChange(studentId: string) {
    console.log('Selected Students:', this.getSelectedStudentIds());
  }

  // Function to get the selected student IDs
  getSelectedStudentIds(): string[] {
    return Object.keys(this.selectedStudents).filter(
      (id) => this.selectedStudents[id]
    );
  }
 submitSelectedStudents() {
    const selectedIds = this.getSelectedStudentIds();
    console.log('Selected Student IDs:', selectedIds);

   this.addModel.classStudentId = selectedIds
   console.log(this.addModel);
    this.attendenceService.addAttendencePresentforMultiple(this.addModel).subscribe(response => {
      console.log('Students added successfully', this.addModel);
    });
    // Call your API or perform other actions with the selected IDs
    // Example:
    // this.yourService.addStudentsToClass(selectedIds).subscribe(response => {
    //   console.log('Students added successfully', response);
    // 
  }
}
