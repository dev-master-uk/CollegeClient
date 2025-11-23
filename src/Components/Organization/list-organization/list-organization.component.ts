import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../../../Services/Organization/organization.service';
import { CommonModule } from '@angular/common';
import { UpdateOrganizationComponent } from '../update-organization/update-organization.component';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizationAdd, OrganizationUpd } from '../../../Models/OrganizationModels';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../Models/AuthModels';
import { AddOrganizationComponent } from '../add-organization/add-organization.component';

@Component({
  selector: 'app-list-organization',
  standalone: true,
  imports: [CommonModule, UpdateOrganizationComponent, FormsModule, ReactiveFormsModule, AddOrganizationComponent],
  templateUrl: './list-organization.component.html',
  styleUrl: './list-organization.component.css'
})
export class ListOrganizationComponent implements OnInit {
  getModel: any;
  getbyIdM: any;
  organizationForm: FormGroup;
  mPhoto: File | null = null;
  logo: File | null = null;
  responseMessage: string | null = null;
  model: OrganizationUpd;
  
  mmm:any

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
    bbb?: number;
    id: any;
    name: any;
    address: any;
    infoEmail: any;
    phone: any;
    website: any;
  updatedBy: any;
  bId: any;
  user?: User
  upd: string='';

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private authService: AuthService
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
    this.model = {
      id: '',
      name: '',
      address: '',
      infoEmail: '',
      phone: '',
      website: '',
      updatedBy: '',
      
    };
    //this.getbyIdM = {
    //  id:'',
    //  name: '',
    //  address: '',
    //  infoEmail: '',
    //  phone: '',
    //  website: '',
    //  updatedBy: ''
    //}
  }
  ngOnInit(): void {

    //get username
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;

        }
      });
    this.user = this.authService.getUser();
    

        this.organizationService.getOrganizations().subscribe({
          next: (response) => {
            this.getModel = response;
            console.log(response);
          },
          error: (err: any) => {
            console.error(err);
          }
        });

    

      this.model.id = this.getbyIdM.id;
      this.model.name = this.getbyIdM.name;
      this.model.address = this.getbyIdM.address;
      this.model.infoEmail = this.getbyIdM.infoEmail;
      this.model.phone = this.getbyIdM.phone;
      this.model.website = this.getbyIdM.website;
      this.model.updatedBy = `${this.user?.username}`
      
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

  lllll() {
    this.bbb=5+6
  }

  onSubmit(): void {
    if (this.organizationForm.invalid || !this.mPhoto || !this.logo) {
      alert('Please fill in all fields and upload both files.');
      return;
    }

    const formDatau: OrganizationUpd = this.organizationForm.value;

    this.organizationService
      .updateOrganizationData(formDatau, this.mPhoto, this.logo)
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
  

  onUpdate(): void {
    if (!this.mPhoto || !this.logo) {
      alert('Please fill in all fields and upload both files.');
      return;


    }

   
    console.log('kkkkkkkkkk', this.model)
    this.organizationService
      .updateOrganizationData( this.model, this.mPhoto, this.logo)
      .subscribe({
        next: (response) => {
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          console.log(response);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload organization data.');
          console.log('llllll',this.model)
          this.responseMessage = 'Failed to add organization.';

        },
      });
    
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getbyid(id: string) {
    this.organizationService.getOrganization(id).subscribe({
      next: (response) => {
        this.getbyIdM = response;
        console.log(response);
        this.ngOnInit();
        

      }
    });
  }

  delete(id: string) {
    this.organizationService.deleteOrganization(id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
        alert('Organization deleted successfully!');
        this.responseMessage = 'Organization successfully deleted.';
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete organization.');
        this.responseMessage = 'Failed to delete organization.';
      }
      }
    )
    
  }

}
