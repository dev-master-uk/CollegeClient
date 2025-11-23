import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { BranchAdd } from '../../../Models/BranchModels';
import { OrganizationService } from '../../../Services/Organization/organization.service';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';
import { BranchService } from '../../../Services/Branch/branch.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [ReactiveFormsModule, MatStepperModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, CommonModule, FormsModule, MatButtonModule,
    MatIconButton, MatIconModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddBranchComponent implements OnInit {
  selected: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  user?: User;
  mPhoto: File | null = null;
  logo: File | null = null;
selectedd: any;
    selecteddd?: [];
    responseMessage: any;
  constructor(private fb: FormBuilder, private organizationService: OrganizationService,
    private branchService: BranchService, private authService: AuthService) {
    this.firstFormGroup = this.fb.group({
      name: [''],
      address: [''],
      infoEmail: [''],
      phone: [''],
      website: [''],
      addedBy: [''],
      location: [''],
      organizationId: [''],
     
    });
    this.secondFormGroup = this.fb.group({
  facebookUrl: ['', Validators.required],
      twitterUrl: ['', Validators.required],
      instagramUrl: ['', Validators.required],
      youtubeUrl: ['', Validators.required],
      linkedinUrl: ['', Validators.required],
      snapchatUrl: ['', Validators.required],
      whatsappUrl: ['', Validators.required],
      telegramUrl: ['', Validators.required],
      googleUrl: ['', Validators.required],
    });
    //this.selected = {
    //  name: '',
    //  address: '',
    //  infoEmail: '',
    //  phone: '',
    //  website: '',
    //  addedBy: '',
    //  location: '',
    //  organizationId: '',
    //  bid: '',
    //  facebookUrl: '',
    //  twitterUrl: '',
    //  instagramUrl: '',
    //  youtubeUrl: '',
    //  linkedinUrl: '',
    //  snapchatUrl: '',
    //  whatsappUrl: '',
    //  telegramUrl: '',
    //  googleUrl: '',
    //}
   
  }
  ngOnInit(): void {

    this.authService.user()
    .subscribe({
      next: (response) => {
        

        }
    });
    this.user = this.authService.getUser();
    this.firstFormGroup.patchValue({ addedBy: this.user?.username});
  



      this.getOrganizationForSelect();
    }


  //passhide
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  //passhide
  //slepper


  //private _formBuilder = inject(FormBuilder);

  //firstFormGroup = this._formBuilder.group({
  //  firstCtrl: ['', Validators.required],


  //});
  //secondFormGroup = this._formBuilder.group({
  //  secondCtrl: ['', Validators.required],
  //});


  isLinear = false;
  //sleep
  getOrganizationForSelect()
  {
    this.organizationService.getOrganizations().subscribe({
      next: (response) => {
        this.selected = response
        console.log(this.selected)
        
      },
    
    });
  }
  onFileSelect(event: Event, fileType: 'MPhoto' | 'Logo'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'MPhoto') {
        this.mPhoto = input.files[0];
      } else if (fileType === 'Logo') {
        this.logo = input.files[0];
      }
    }
  }



  onSupmit() :void {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid || !this.mPhoto || !this.logo
    ) {
      
      alert('Please fill in all fields');
      return;
    }
    const addModelData: BranchAdd = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    }
 
    this.branchService.addBranch(addModelData, this.mPhoto, this.logo).subscribe({
      next: (response) => {
        alert('Organization data uploaded successfully!');
        this.responseMessage = 'Organization successfully added.';
        console.log(response);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to upload organization data.');
        this.responseMessage = 'Failed to add organization.';
       
      },

    });
  
   /* console.log(this.selected)*/

  }
}
