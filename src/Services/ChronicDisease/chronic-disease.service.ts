import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChronicDiseaseService {

  constructor(private http: HttpClient) { }

  getchronicDiseases(): any  {
    return this.http.get(`https://localhost:7009/api/Students/GetStudentChronicDiseases`);
  }
}
