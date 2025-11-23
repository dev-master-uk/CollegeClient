import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { LevelService } from '../../../Services/Level/level.service';
import { LevelAddModel, LevelListModel } from '../../../Models/LevelModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [MaterialModuleModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent implements OnInit {
  branchId: string = '';
  addModel: FormGroup;
  user?: User;
  getbyBrId: any;
  userIdd: any;
  levelsByBranchModel: LevelListModel[] = [];
  responseMessage?: string;
  paramsSubscription?: Subscription;
  id: any;
    getbyId: any;
  constructor(private levelService: LevelService, private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.addModel = this.fb.group({
      name: ['', Validators.required],
      branchId: ['', Validators.required],
      addedBy: ['', Validators.required],
    });


  }
  isAddLevelModalVisible: boolean = false;
  ngOnInit(): void {

    this.user = this.authService.getUser();

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.levelService.getLevelsbyBranch(this.id)
            .subscribe({
              next: (response: any) => {
                this.levelsByBranchModel = response;
                console.log(this.levelsByBranchModel)
                this.data = new MatTableDataSource(this.levelsByBranchModel);
                this.data.paginator = this.paginator;
                this.data.sort = this.sort;
                
              }
            });
          // set branchId to the current this.id
          this.addModel.patchValue({
            branchId: this.id
          });
          // set addedBy to the current user's id
          this.user = this.authService.getUser();
              this.addModel.patchValue({ addedBy: this.user?.id });
        }
      }
    }); 
  }



 
  getLevels(): any {
    this.levelService.getLevels().subscribe({
      next: (response:any) => {
        console.log(response);
      }
    });
  }

  getLevelById(idj: any): any {
    this.levelService.getLevelById(idj).subscribe({
      next: (response:any) => {
        console.log(response);
      }
    });
  }

  addLevel(): void {
    if (this.addModel.invalid) {
      alert('Please fill in all fields and upload both files.');
      return;
    }

    const formData: LevelAddModel = this.addModel.value;

    this.levelService
      .addLevel(formData)
      .subscribe({
        next: (response:any) => {
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          console.log(response);
        },
        error: (err:any) => {
          console.error(err);
          alert('Failed to upload organization data.');
          this.responseMessage = 'Failed to add organization.';

        },
      });
  
  }

  updateLevel(data: any): any {
    this.levelService.updateLevel(data).subscribe({
      next: (response:any) => {
        console.log(response);
      }
    });
  }

  openAddmodal() {
    this.isAddLevelModalVisible = true;
  }

  closeAddmodal() {
    this.isAddLevelModalVisible = false;
  }

  //getLevelsByBrId(id: any): any {
  //  // get levels by user.branchId
  //  this.levelService.getLevelsbyBranch(this.branchId).subscribe({
  //    next: (response: any) => {
  //      this.levelsByBranchModel = response;
  //      console.log(this.levelsByBranchModel)
  //      this.data = new MatTableDataSource(this.levelsByBranchModel);
  //      this.data.paginator = this.paginator;
  //      this.data.sort = this.sort;
  //    }
  //  });
  //};




  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['id', 'name', 'addedBy', 'branchId','Action'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.levelsByBranchModel);
  selection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }
}
