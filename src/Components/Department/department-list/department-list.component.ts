import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { DepartmentService } from '../../../Services/Department/department.service';
import { DepartmentAdd, DepartmentList } from '../../../Models/DepartmentModels';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../Services/Branch/branch.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {

  user?: User;
  
  departmentList: DepartmentList[] = [];
  addModel: FormGroup;
    id: any;
    responseMessage?: string;

  constructor(private departmentService: DepartmentService, private fb: FormBuilder, private authService: AuthService, private brbr:BranchService) {
    this.addModel = this.fb.group({
      name: [''],
      bId: [''],
      addedBy: [''],
    });
  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.addModel.patchValue({ addedBy: this.user?.username });
    this.addModel.patchValue({ bId: this.user?.branchId });

    this.id = this.user?.branchId;
   this.getDepartmentListByBid();
   
  }
  getDepartmentListByBid() {
    this.departmentService.getDepartmentsByBidId(`${this.user?.branchId}`).subscribe({
      next: (response: any) => {
        this.departmentList = response;
        this.data = new MatTableDataSource(this.departmentList);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    });
  }
  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['name','Actions'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.departmentList);
  selection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  addDepartment(): void {
    if (this.addModel.invalid) {
      alert('Please fill in all fields and upload both files.');
      return;
    }
    const formData: DepartmentAdd = this.addModel.value;
    this.departmentService.addDepartment(formData)
      .subscribe({
      next: (response: any) => {
        console.log(response);
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          console.log(response);
       this.getDepartmentListByBid();
        },
      error: (err: any) => {
          console.error(err);
          alert('Failed to upload organization data.');
          this.responseMessage = 'Failed to add organization.';
        },
    });
  }
}
