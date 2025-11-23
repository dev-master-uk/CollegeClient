import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentImgAdd, StudentImgStId, StudentImgUpd } from '../../Models/StudentImgModels';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentImgService {

  API_URL = 'https://localhost:7009/api/StudentImgs';

  constructor(private http: HttpClient) { }

  uplouploadStudentImg(
    model: StudentImgAdd,
    stImgF: File
  ) {
    const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('type', model.type);
    formData.append('studentId', model.studentId);
    formData.append('description', model.description);
    formData.append('addedBy', model.addedBy);
    formData.append('bId', model.bId);

    // Append the files
    formData.append('StImgF', stImgF);
    console.log(stImgF)
    return this.http.post(`${this.API_URL}/PostStudentImg`, formData);

  }

  updateStudentImg(
    model: StudentImgUpd,
    img: File
  ) {
    const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('type', model.type);
    formData.append('studentId', model.studentId);
    formData.append('description', model.description);
    formData.append('addedBy', model.updatedBy);
    formData.append('bId', model.bId);

    // Append the files
    formData.append('Img', img);

    return this.http.put(`https://localhost:7009/api/StudentImages/PutStudentImg`, formData);
  }

  deleteStudentImg(id: any) {
    return this.http.delete(`https://localhost:7009/api/StudentImages/DeleteStudentImg/${id}`);
  }

  getStudentImg() {
    return this.http.get(`https://localhost:7009/api/StudentImages/GetStudentImgs`);
  }

  getStudentImgById(id: any) {
    return this.http.get(`https://localhost:7009/api/StudentImages/GetStudentImg/${id}`);
  }

  getStudentImgByStudentId(id: any) {
    return this.http.get(`https://localhost:7009/api/StudentImgs/GetStudentImgBystudent/${id}`);
  }

  getStudentImgByStIdandType(id: any) {
    return this.http.get(`https://localhost:7009/api/StudentImgs/GetStudentProfileImg/${id}`);
  }


  changeprfilephoto(id: string, model: StudentImgStId) {
    return this.http.put(`https://localhost:7009/api/StudentImgs/UpdateStudentProfileImg/${id}`, model);
  }
}
