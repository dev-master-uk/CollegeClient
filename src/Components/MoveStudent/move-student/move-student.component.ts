import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../Services/Student/student.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { GetRequest, StudentListModel, StudentsByClassIdYearIdModel } from '../../../Models/StudentModels';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { LevelService } from '../../../Services/Level/level.service';
import { User } from '../../../Models/AuthModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-move-student',
  standalone: true,
  imports: [MaterialModuleModule, CommonModule, FormsModule, NgFor],
  templateUrl: './move-student.component.html',
  styleUrl: './move-student.component.css',
changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MoveStudentComponent implements OnInit {
  user?: User;
  row:any
  getRequest: GetRequest;
  getStudentToMove: StudentListModel[] = [];
  AddtoMove: StudentsByClassIdYearIdModel
  getSClasses: any;
  levelModel: any;
  clId: any;
    years: any;
  constructor(private studentService: StudentService, private classService: ClassGService, private levelService: LevelService, private authServise: AuthService) {
    this.AddtoMove = {
      studentIds: [],
      yearId: '',
      ClassGId: '',

      AddedBy: '',

    };
    this.getRequest = {
      yearId: '',
      classId: ''
    }
    this.levelModel = {
      id: '',
      name:'',
    }
    this.getSClasses = {
      id: '',
      name:'',
    }
  
  } 
  ngOnInit(): void {
    this.user = this.authServise.getUser();
    
    this.getAllyears();

  

    this.levelService.getLevelsbyBranch(`${this.user?.branchId}`).subscribe({
      next: (response: any) => {
        this.levelModel = response;
       
        console.log(this.levelModel)

      }
    });
      
    }
  getStudentToMoveM() {
    this.studentService.GetStudentsByClassIdYearId(this.getRequest).subscribe({
      next: (response: any) => {
        this.getStudentToMove = response;
        console.log(this.getStudentToMove)
        this.alldata = new MatTableDataSource(this.getStudentToMove);
        this.alldata.paginator = this.paginator;
        this.alldata.sort = this.sort;
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

  getLevels() {
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
  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedAllColumn: string[] = [ 'fullName','address','birthDate', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  alldata = new MatTableDataSource(this.getStudentToMove);
  allselection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alldata.filter = filterValue.trim().toLowerCase();
  }
  //
  isAllSelected() {
    const numSelected = this.allselection.selected.length;
    const numRows = this.alldata.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.allselection.clear();
      return;
    }

    this.allselection.select(...this.alldata.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentListModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.allselection.isSelected(row) ? 'deselect' : 'select'} row ${row.fullName + 1}`;
  }
 
}

