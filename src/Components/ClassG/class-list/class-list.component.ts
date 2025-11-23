import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassGAdd, ClassGList } from '../../../Models/ClassGModel';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassgAddComponent } from '../classg-add/classg-add.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule, FormsModule, ClassgAddComponent, NgClass],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit {
  user?: User;
  paramsSubscription?: Subscription;
  id: any;
  geiBylevelModel: ClassGList[] = [];
    isAddLevelModalVisible: boolean=false;

  constructor(private classGService: ClassGService, private authService: AuthService, private route: ActivatedRoute) { }
    ngOnInit(): void {
      this.user = this.authService.getUser();

      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
            this.classGService.getClassesByLevel(this.id)
              .subscribe((response: any) => {
                this.geiBylevelModel = response;
                this.data = new MatTableDataSource(this.geiBylevelModel);
                this.data.paginator = this.paginator;
                this.data.sort = this.sort;
                console.log(response);
      });
      }
       }                
        });        
              

      //this.classGService.getClasses().subscribe((data: any) => {
      //  console.log(data);
      //});

   
  }

  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['id', 'name','levelId', 'addedBy', 'updatedBy', 'addedTime', 'updateTime', 'bId', 'Actions'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.geiBylevelModel);
  selection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  openAddmodal() {
    this.isAddLevelModalVisible = true;
  }

  closeAddmodal() {
    this.isAddLevelModalVisible = false;
  }
}
