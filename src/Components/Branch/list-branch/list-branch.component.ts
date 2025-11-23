import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy,  Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';
import { BranchAdd, BranchUpd, BranchesList } from '../../../Models/BranchModels';
import { BranchService } from '../../../Services/Branch/branch.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MaterialModuleModule } from '../../../material-module/material-module.module';

@Component({
  selector: 'app-list-branch',
  standalone: true,
  imports: [CommonModule,
    MaterialModuleModule,
    AddBranchComponent, FormsModule, NgFor],
  templateUrl: './list-branch.component.html',
  styleUrl: './list-branch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBranchComponent implements OnInit {
  addModel: BranchAdd;
  updModel: BranchUpd;
  branches: BranchesList[]=[];
    branch: any;
    
  constructor(private branchService: BranchService)
  {
    this.addModel = {
      name:'',
     
      addedBy:'',
      address:'',
      infoEmail:'',
      phone:'',
      website:'',
      location:'',
      organizationId:'',
      facebookUrl:'',
      twitterUrl:'',
      instagramUrl:'',
      youtubeUrl:'',
      linkedinUrl:'',
      snapchatUrl:'',
      whatsappUrl:'',
      telegramUrl:'',
      googleUrl:'',
    };
    this.updModel = {
      name:'',
     
      updatedBy:'',
      address:'',
      infoEmail:'',
      phone:'',
      website:'',
      location:'',
      organizationId:'',
      facebookUrl:'',
      twitterUrl:'',
      instagramUrl:'',
      youtubeUrl:'',
      linkedinUrl:'',
      snapchatUrl:'',
      whatsappUrl:'',
      telegramUrl:'',
      googleUrl:'',
    };
  }
    ngOnInit(): void {
      this.onGetAll();
    }

  onUpdate() {
    this.branchService.updateBranch(this.updModel).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onDelete(id: string) {
    this.branchService.deleteBranch(id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onGetAll() {
    this.branchService.getAllBranches().subscribe(
      (response: any) => {
        this.branches = response;
        this.data = new MatTableDataSource(this.branches);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        console.log(response);
      
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onGetById(id: string) {
    this.branchService.getBranchById(id).subscribe(
      (response: any) => {
        this.branch = response;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //displayedColumn: string[] = ['position', 'name', 'weight'];
  displayedColumn: string[] = ['id', 'name', 'address', 'infoEmail', 'phone', 'website', 'orgName', 'logoPhoto', 'Actions'];
  //data = new MatTableDataSource(ELEMENT_DAT);
  data = new MatTableDataSource(this.branches);
  selection = new SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

}
