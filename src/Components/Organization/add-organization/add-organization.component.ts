import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OrganizationAdd } from '../../../Models/OrganizationModels';
import { OrganizationService } from '../../../Services/Organization/organization.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent implements OnInit {
  organizationForm: FormGroup;
  mPhoto: File | null = null;
  logo: File | null = null;
  responseMessage: string | null = null;
  model: OrganizationAdd
  user?: User;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;


  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private authService: AuthService
  ) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      infoEmail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      addedBy: ['', Validators.required],
    });
    this.model = {
      name: '',
      address: '',
      infoEmail:'',
      phone: '',
      website: '',
      addedBy: '',
     
    }
  }
  ngOnInit(): void {
      this.authService.user()
      .subscribe({
        next: (response) => {
         // this.model.addedBy =`${this.user?.id}` ;
          
        }
      });

    // set organizationForm.addedBy to the current user's id
    this.user = this.authService.getUser();
    this.organizationForm.patchValue({ addedBy: this.user?.username });
    //this.model.addedBy = `${this.user?.id}`;

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

  onSubmit(): void {
    if (this.organizationForm.invalid || !this.mPhoto || !this.logo) {
      alert('Please fill in all fields and upload both files.');
      return;
    }

    const formData: OrganizationAdd = this.organizationForm.value;

    this.organizationService
      .uploadOrganizationData(formData, this.mPhoto, this.logo)
      .subscribe({
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
  }
  oNadd() {
    if (this.organizationForm.invalid || !this.mPhoto || !this.logo) {
      alert('Please fill in all fields and upload both files.');
      return;
    }
    this.organizationService
      .uploadOrganizationData(this.model, this.mPhoto, this.logo)
      .subscribe({
        next: (response) => {
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          this.imageUploadForm?.resetForm();
          console.log(response);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload organization data.');
          this.responseMessage = 'Failed to add organization.';

        },
      });
  }
}





