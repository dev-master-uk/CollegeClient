import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetRequest, StudentUpdToCompleteModel, StudentsByClassIdYearIdModel } from '../../Models/StudentModels';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API_URL = 'https://localhost:7009/api/Students';


  constructor(private http: HttpClient) { }

  getAll() {
   return this.http.get(`${this.API_URL}/GetStudents`)
  }


  getAllByBranch(id:any) {
    return this.http.get(`${this.API_URL}/GetStudentsByBid/${id}`)
  }

  getAllUnCompleted() {
    return this.http.get(`${this.API_URL}/GetUnCompletedStudent`)
  }

  getAllUnCompletedByBranch(id: any) {
    return this.http.get(`${this.API_URL}/GetUnCompletedStudentsByBidId/${id}`)
  }

  getAllUnCompletedByBranchCount(id: any) {
    return this.http.get(`${this.API_URL}/GetUnCompletedStudentsByBidIdCount/${id}`)
  }

  getStudentById(id: string) {
    return this.http.get(`${this.API_URL}/GetStudent/${id}`)
  }
  getStudentByUserId(id: string) {
    return this.http.get(`${this.API_URL}/GetStudentbyUserId/${id}`)
  }

  addStudent(data: any) {
    return this.http.post(`${this.API_URL}/PostStudent`, data)
  }

  updateStudentToComplete(id: string, data: StudentUpdToCompleteModel) {
    return this.http.put(`${this.API_URL}/UpdateStudent/${id}`, data)
  }
  updateStudent(id:string,data: any) {
    return this.http.put(`${this.API_URL}/PutStudent/${id}`, data)
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.API_URL}/DeleteStudent/${id}`)
  }

  getStudentByBranchId(id: string) {
    return this.http.get(`${this.API_URL}/GetStudentsByBidId/${id}`)
  }
  getClassByStudentAndYear(studentId:string) {
    return this.http.get(`${this.API_URL}/GetClassIdByStudentIdAndYear/${studentId}`)
  }
  GetStudentsByClassIdYearId(model: any) {
    console.log('serv', model)

    return this.http.post(`${this.API_URL}/GetStudentsByClassIdYearId`,model)
  }

  moveStudent(model: any) {

    return this.http.get(`${this.API_URL}/AddStudentsToClassG`,model)
  }
  getYears() {
    return this.http.get('https://localhost:7009/api/Years/GetYears')
  }

}
