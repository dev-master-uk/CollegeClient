import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { group } from 'console';
import { AddLessonService } from '../../Services/AddLesson/add-lesson.service';
import { BrowserModule } from '@angular/platform-browser';
import { AddLessonFile } from '../../Models/AddLesson';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { TeacherService } from '../../Services/Teacher/teacher.service';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [FormsModule,NgClass,ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent implements OnInit {
  user?: any;

  isvideoModalVisible = true;
  isFileModalVisible = false;

  

   vFile: File | null = null;
  file: File | null = null;
    addVideoModel: FormGroup;
  addFileModel: AddLessonFile;
    responseMessage: any;
    fileResponseMessage: any;
  teacherList: any;

constructor(private fb: FormBuilder,
   private addLessonService: AddLessonService,
   private authService: AuthService,
   private teacherService: TeacherService
  ) {
    this.addVideoModel = this.fb.group({
      title: [],
      description: [],
      classGId: [],
      subjectId: [],
      isAvailable: [],
    });
    this.addFileModel = {
      title: '',
      description: '',
      classGId: '',
      subjectId: '',
      isAvailable: false,
    };
}
ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user.id) {
      this.teacherService.getTeachersByUserId(this.user.id).subscribe(teacher => {
        this.teacherList = teacher;
      });
    }
  }
// onSubmit() {
//     if (this.addModel.invalid || !this.stImgF) {
//       return;
//     }
//     const model = this.addModel.value;
//     this.studentImgService.uplouploadStudentImg(model, this.stImgF).
//       subscribe({
//         next: (response) => {
         
//           alert('Image uploaded successfully!');
//           this.responseMessage = 'Image successfully added.';
//           this.getModel = response
//           console.log("mmmmmmmmmm",response);
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Failed to upload Image.');
//           this.responseMessage= 'Failed to add Image.';
//           console.log(model);
//         },
//       });
//   }
  onVideoLessonSubmit() {
    if(!this.vFile || !this.addVideoModel.valid) {
      this.responseMessage = 'Error: Please fill all required fields.';
      return;
    }
    const model = this.addVideoModel.value;
    console.log(model);
    this.addLessonService.addVideoLesson(model, this.vFile).subscribe({
      next: (response) => {
          console.log(model);
        this.responseMessage = 'Video lesson added successfully.';
        console.log(response);
      
      },
      error: (err) => {
        console.error(err);
        this.responseMessage = 'Failed to add video lesson.';
      }
    });

  }
  onFileLessonSubmit() {
    if(!this.file || !this.addFileModel) {
      return;
    }
console.log(this.addFileModel);
    this.addLessonService.addFileLesson(this.addFileModel, this.file).subscribe({
      next: (response) => {
        this.responseMessage = 'File lesson added successfully.';
        console.log(response);
      },
      error: (err) => {
        console.error(err);
        this.responseMessage = 'Failed to add file lesson.';
      }
    });
  }
  onVideoFileSelected(event: Event, fileType: 'VFile'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'VFile') {
        this.vFile = input.files[0];
      }
    }
  }

  onFileSelected(event: Event, fileType: 'File'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (fileType === 'File') {
        this.file = input.files[0];
      }
    }
  }

  addFileLesson() {
    // Call the service to add the file lesson
  }
addVideoLesson() {


}


//  TeacherId = lessonsSheetAddDto.TeacherId,
  openvideomodal() {
    this.closeFileModal();
    this.isvideoModalVisible = true;
  }
  closevideomodal() {
    this.isvideoModalVisible = false;
  }
  openFileModal() {
    this.closevideomodal();
    this.isFileModalVisible = true;
  }
  closeFileModal() {
    this.isFileModalVisible = false;
  }
 }