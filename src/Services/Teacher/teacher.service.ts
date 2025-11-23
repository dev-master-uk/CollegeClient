import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherAddModel, TeacherUpdUncompletedModel, UpdateTeacherClassModel, UpdateTeacherSubjecModel } from '../../Models/TeacherModel';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly API_URL = 'https://localhost:7009/api/Teachers';
  constructor(private http: HttpClient) { }

  getteacherById(id: string) {
    return this.http.get(`${this.API_URL}/GetTeacher/${id}`)
  }
  getTeachers() {
    return this.http.get(`${this.API_URL}/GetTeachers`)
  }
 
  getTeachersByBid(id: any) {
    return this.http.get(`${this.API_URL}/GetTeachersByBid/${id}`)
  }
  getTeachersByBidIdCount(id: any) {
    return this.http.get(`${this.API_URL}/GetTeachersByBidIdCount/${id}`)
  }
  getTeachersByUserId(id: any) {
    return this.http.get(`${this.API_URL}/GetTeacherByUserId/${id}`)
  }
  //post teacher
  addTeacher(
    data: TeacherAddModel,
    tImgF: File
  ) {
    const formData = new FormData();
    // Append the model data acording to the TeacherAddModel
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('title', data.title);
    formData.append('jopDescription', data.jopDescription);
    formData.append('userType', data.userType);
    formData.append('userName', data.userName);
    formData.append('password', data.password);
    formData.append('roles', data.roles[0]);
    formData.append('addedBy', data.addedBy);
    formData.append('branchId', data.branchId);
    formData.append('departmentId', data.departmentId);
    // Append the files
    formData.append('TImgF', tImgF);

    console.log(formData)

    return this.http.post(`https://localhost:7009/api/Auths/RegisterTeacher`, formData);


  }
  //post teacher
  completeTeacherAcount(
    id: string,
    data: TeacherUpdUncompletedModel,
    tImgF: File
  ) {
    const formData = new FormData();
    // Append the model data acording to the TeacherAddModel
    formData.append('title', data.title);
    formData.append('jopDescription', data.jopDescription);
    formData.append('updatedBy', data.updatedBy);
    formData.append('departmentId', data.departmentId);
    // Append the files
    formData.append('TImgF', tImgF);

    return this.http.put(`${this.API_URL}/UpdateTeacherToComplete/${id}`, formData);


  }
  //update teacher subject and class
  updateTSubject(
    id: string,
    data: UpdateTeacherSubjecModel
  ) {
    return this.http.put(`${this.API_URL}/UpdateTeacherSubject/${id}`, data);
  }

  updateTClass(
    tid: string,
    sid: string,
  ) {
    return this.http.get(`${this.API_URL}/UpdateTeacherIdInSubjectClassG/${sid}/${tid}`);
  }
  //get teacher by id
  getTeacherById(id: string) {
    return this.http.get(`${this.API_URL}/GetTeacher/${id}`);
  }
  // // get teacher by id with classname and subject name
  // getTeacherByIdWithSubject(id: string) {
  //   return this.http.get(`${this.API_URL}/GetTeacherByIdWithClassAndSubject/${id}`);
  // }
  //delete teacher by id
  deleteClassfromTeacher(subclassId: string) {
    return this.http.delete(`${this.API_URL}/DeleteTeacherFromSubjectClassG/${subclassId}`);
  }
  deleteSubjectfromTeacher(teacherId: string, subjectId: string) {
    return this.http.delete(`${this.API_URL}/DeleteSubjectFromTeacher/${teacherId}/${subjectId}`);
    
  }
  //get class group by teacher id
  getClassAndSubjectByTeacherId(teacherId: string) {
    return this.http.get(`${this.API_URL}/GetSubjectClassGsByTeacherId/${teacherId}`);
  }
getAllClassAndSubjectByBid(bId: string) {
    return this.http.get(`${this.API_URL}/GetSubjectClassGsByBId/${bId}`);
  }
}
