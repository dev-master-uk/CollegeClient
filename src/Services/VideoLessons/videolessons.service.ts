import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideolessonsService {

  constructor(private http: HttpClient) { }
  getVideoLessons() {
    return this.http.get('https://localhost:7009/api/VideoLessons/GetVideoLessons');
  }
  getVideoLessonById(id: string) {
    return this.http.get(`https://localhost:7009/api/VideoLessons/GetVideoLesson/${id}`);
  }
  getVideoLessonsByClassId(classId: string) {
    return this.http.get(`https://localhost:7009/api/VideoLessons/GetVideoLessonsByClassId/${classId}`);
  }
}
