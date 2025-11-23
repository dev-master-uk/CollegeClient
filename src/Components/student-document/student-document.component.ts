import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../Models/AuthModels';
import { AuthService } from '../../Services/Auth/auth.service';
import { IdDocumentService } from '../../Services/IdDocument/id-document.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../Pipes/safe-url.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-student-document',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SafeUrlPipe, NgClass],
  templateUrl: './student-document.component.html',
  styleUrl: './student-document.component.css'
})
export class StudentDocumentComponent implements OnInit {

  user?: User;
  types: any;
  addModel: FormGroup;
    
    responseMessage?: string;
  dFile: File | null = null;
  id: any;
  paramsSubscription?: Subscription;
    documentview: any;
  isDocumentModalVisible: boolean = false;
  constructor(private authService: AuthService, private documentService: IdDocumentService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.addModel = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      documentIdTypeId: ['', Validators.required],
      bId: ['', Validators.required],
      addedBy: ['', Validators.required],
      studentId: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.addModel.patchValue({ addedBy: this.user?.username });
    this.addModel.patchValue({ bId: this.user?.branchId });


    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.addModel.patchValue({ studentId: this.id });
        }
      }
      });

    this.documentService.getDocumentTypeByBid(`${this.user?.branchId}`).subscribe({
      next: (response) => {
        console.log(response);
        this.types= response;
      }
    });

    this.documentService.getbyStudentId(`${this.id}`).subscribe({
      next: (response) => {
        console.log(response);
        this.documentview = response;
      },
    });
   
  }

  onFileSelect(event: Event, fileType: 'DFile'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'DFile') {
        this.dFile = input.files[0];
      }
    }
  }

  onSubmit() {
    if (this.addModel.invalid || !this.dFile) {
      return;
    }
    const model = this.addModel.value;
    this.documentService.postDocument(model, this.dFile).
      subscribe({
        next: (response) => {
          alert('Organization data uploaded successfully!');
          this.responseMessage = 'Organization successfully added.';
          console.log(response);
          console.log(model);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload organization data.');
          this.responseMessage = 'Failed to add organization.';
          console.log(model);
        },
      });
  }
  openDocumentsmodal() {
    this.isDocumentModalVisible = true;
  }
  closeDocumentsmodal() {
    this.isDocumentModalVisible = false;
  }

}
