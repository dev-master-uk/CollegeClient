import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentAdd, DepartmentList } from '../../Models/DepartmentModels';
import { BehaviorSubject, Observable,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly API_URL = 'https://localhost:7009/api/Departments';

  constructor(private http: HttpClient) { }
  getDepartments(){
    return this.http.get(`${this.API_URL}/GetDepartments`)
  }
  getDepartmentById(id: string) {
    return this.http.get(`${this.API_URL}/GetDepartment/${id}`)
  }
  getDepartmentsByBidId(id: any):any {
    return this.http.get<DepartmentList>(`${this.API_URL}/GetDepartmentsByBidId/${id}`)
  }
  addDepartment(data: any): Observable<any> {
    //const formData = new FormData();

    //formData.append('name', data.name);
    //formData.append('bId', data.bId);
    //formData.append('addedBy', data.addedBy);

    ////
  return this.http.post(`${this.API_URL}/PostDepartment`, data)
  }
  updateDepartment(id: string, data: DepartmentAdd) {
    return this.http.put(`${this.API_URL}/PutDepartment/${id}`, data)
  }
  deleteDepartment(id: string) {
    return this.http.delete(`${this.API_URL}/DeleteDepartment/${id}`)
  }
}
