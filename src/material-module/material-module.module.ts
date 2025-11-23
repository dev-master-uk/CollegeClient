import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModuleRoutingModule } from './material-module-routing.module';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MaterialComponents = [
  MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule,
  MatFormFieldModule, MatDatepickerModule, MatStepperModule,
  MatSelectModule, MatCheckboxModule,
  MatButtonModule, MatIconButton, MatIconModule, MatProgressSpinnerModule,
  MatGridListModule,MatCardModule,MatDividerModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModuleRoutingModule,
    MaterialComponents
  ],
  exports: [
    MaterialModuleRoutingModule,
    MaterialComponents
  ]
})
export class MaterialModuleModule { }
