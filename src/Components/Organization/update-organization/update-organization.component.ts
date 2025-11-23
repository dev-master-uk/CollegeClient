import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationAdd, OrganizationUpd } from '../../../Models/OrganizationModels';
import { OrganizationService } from '../../../Services/Organization/organization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-organization',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-organization.component.html',
  styleUrl: './update-organization.component.css'
})
export class UpdateOrganizationComponent {

  organizationForm: FormGroup;
  mPhoto: File | null = null;
  logo: File | null = null;
  responseMessage: string | null = null;
  id: string ="e95ef341-40ee-4212-9294-d4cfffe53ee6"
  getbyIdM: any
 
 

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService
  ) {
    this.organizationForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      infoEmail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      updatedBy: ['', Validators.required],
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

  onSubmit(): void {
    if (this.organizationForm.invalid || !this.mPhoto || !this.logo) {
      alert('Please fill in all fields and upload both files.');
      return;
    }

    const formDatau: OrganizationUpd = this.organizationForm.value;

    this.organizationService
      .updateOrganizationData(formDatau,this.mPhoto, this.logo)
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

}
