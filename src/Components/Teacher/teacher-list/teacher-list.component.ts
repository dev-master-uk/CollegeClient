import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { AuthService } from '../../../Services/Auth/auth.service';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { User } from '../../../Models/AuthModels';
import { TeacherListModel } from '../../../Models/TeacherModel';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [MaterialModuleModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit{

  user?: User;
  branchId: any;
  teachersByBidModel: TeacherListModel[] = [];
  constructor(private authService: AuthService, private teacherService: TeacherService)
  {
  }
    ngOnInit(): void {
      this.getallTeachersByBid();
    }
  getallTeachersByBid() {
    this.user = this.authService.getUser();
    this.branchId = this.user?.branchId;
    this.teacherService.getTeachersByBid(this.branchId).subscribe({
      next: (response: any) => {
        this.teachersByBidModel = response;
        console.log(this.teachersByBidModel)
        this.alldata = new MatTableDataSource(this.teachersByBidModel);
        this.alldata.paginator = this.paginator;
        this.alldata.sort = this.sort;
      }
    });
  }


  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedAllColumn: string[] = ['name', 'jopDescription', 'departmentName', 'email', 'imgPath', 'Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  alldata = new MatTableDataSource(this.teachersByBidModel);
  allselection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alldata.filter = filterValue.trim().toLowerCase();
  }
}
