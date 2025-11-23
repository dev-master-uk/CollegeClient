import { Component, OnInit } from '@angular/core';
import { ClassGService } from '../../../Services/ClassG/class-g.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassGAdd } from '../../../Models/ClassGModel';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { LevelService } from '../../../Services/Level/level.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';

@Component({
  selector: 'app-classg-add',
  standalone: true,
  imports: [MaterialModuleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './classg-add.component.html',
  styleUrl: './classg-add.component.css'
})
export class ClassgAddComponent implements OnInit {
  addModel: FormGroup;
  responseMessage?: string;
  user?: User;
    id: string | undefined;
    getByBrId: any;
  constructor(private classgService: ClassGService,
    private fb: FormBuilder, private levelService: LevelService,
    private authService: AuthService) {
    this.addModel = this.fb.group({
      name: [''],
      addedBy: [''],
      levelId: [''],
      bid: [''],
    });
    
  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.id = this.authService.getUser()?.branchId;
      this.levelService.getLevelsbyBranch(`${this.id}`)
      .subscribe({
        next: (response:any) => {
          console.log(response);
          this.getByBrId = response;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    // set addmodel.addedby = this.user.id
    this.addModel.patchValue({ addedBy: this.user?.username });
    this.addModel.patchValue({ bid: this.user?.branchId });
    }


  addClassG() {

    if (this.addModel.invalid) {
      alert('Please fill in all fields and upload both files.');
      return;
    }

    const formData: ClassGAdd = this.addModel.value;

    this.classgService.addClass(formData)
      .subscribe({
        next: (response) => {
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          console.log('response', formData);
         
        },
        error: (err) => {
          console.error(err);
          console.log('response', formData);
          alert('Failed to upload organization data.');
          this.responseMessage = 'Failed to add organization.';

        },
      });
  }
}
