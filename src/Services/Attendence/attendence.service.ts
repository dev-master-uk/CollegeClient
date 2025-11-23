import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendenceAddModel } from '../../Models/AttendenceModel';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private http: HttpClient) { }
  GetStudentsByClassIdYearId(model: any) {

    return this.http.get(`https://localhost:7009/api/Students/GetStudentsByClassIdYearId`, model)
  }
  addAttendencePresentforMultiple(
    model: AttendenceAddModel
  ) {
    console.log('servisco',model)
    return this.http.post(`https://localhost:7009/api/Attendences/PostAttendencePresentforMultiple`, model)
  }
  
}
