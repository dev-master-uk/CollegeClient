import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddLessonFile, AddLessonVideo } from '../../Models/AddLesson';

@Injectable({
  providedIn: 'root'
})
export class AddLessonService {

  constructor(private http:HttpClient) { }
  addVideoLesson(model:AddLessonVideo, vFile: File) {
    const formData = new FormData();
    formData.append('title', model.title);
    formData.append('description', model.description);
    formData.append('classGId', model.classGId);
    formData.append('subjectId', model.subjectId);
    formData.append('isAvailable', JSON.stringify(model.isAvailable));
    formData.append('VFile', vFile);
    return this.http.post('https://localhost:7009/api/VideoLessons/UploadVideo', formData);
  }
  addFileLesson(model:AddLessonFile, file: File) {
    const formData = new FormData();
    formData.append('title', model.title);
    formData.append('description', model.description);
    formData.append('classGId', model.classGId);
    formData.append('subjectId', model.subjectId);
    formData.append('isAvailable', JSON.stringify(model.isAvailable));
    formData.append('File', file);
    return this.http.post('https://localhost:7009/api/LessonsSheets/PostVideoLesson', formData);
  }
}
