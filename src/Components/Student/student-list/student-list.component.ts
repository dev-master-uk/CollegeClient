import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { StudentService } from '../../../Services/Student/student.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentListModel } from '../../../Models/StudentModels';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModuleModule, NgClass],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  user?: User;
  branchId: any;
  UnCompletedModel: StudentListModel[] = [];
  studentsByBidModel: StudentListModel[] = [];
  isUnCompletedModalVisible: boolean = false;
    UnCompletedCount: any;
  constructor(private studentService: StudentService, private authServise: AuthService) { }
  ngOnInit(): void {
    this.user = this.authServise.getUser();
    this.branchId = this.user?.branchId;

    this.getUnCompletedStudentsByBid();
    this.getallStudentsByBid();
    this.getUnCompletedStudentsByBidCount();
  }

  getUnCompletedStudentsByBidCount() {
    this.studentService.getAllUnCompletedByBranchCount(this.branchId).subscribe({
      next: (response: any) => {
        this.UnCompletedCount = response;
        console.log(this.UnCompletedCount)
    
      }
    });
  }

  getUnCompletedStudentsByBid() {
    this.studentService.getAllUnCompletedByBranch(this.branchId).subscribe({
      next: (response: any) => {
        this.UnCompletedModel = response;
        console.log(this.UnCompletedModel)
        this.data = new MatTableDataSource(this.UnCompletedModel);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    });
  };


  getallStudentsByBid() {
    this.studentService.getAllByBranch(this.branchId).subscribe({
      next: (response: any) => {
        this.studentsByBidModel = response;
        console.log(this.studentsByBidModel)
        this.alldata = new MatTableDataSource(this.studentsByBidModel);
        this.alldata.paginator = this.paginator;
        this.alldata.sort = this.sort;
      }
    });
  };

  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['id', 'userId', 'addedBy', 'birthDate', 'gender', 'email', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.UnCompletedModel);
  selection = new SelectionModel

  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedAllColumn: string[] = ['id', 'userId', 'addedBy', 'birthDate', 'gender', 'email', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  alldata = new MatTableDataSource(this.studentsByBidModel);
  allselection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  openUnCompletedStudents() {
   
      this.isUnCompletedModalVisible = true;
   
  }

  closeUnCompletedStudents() {
    this.isUnCompletedModalVisible = false;
  }
}
