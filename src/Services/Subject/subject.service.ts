import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSubjectModel } from '../../Models/SubjectModels';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjectsByBranch(bId: string) {
    return this.http.get(`https://localhost:7009/api/subjects/GetSubjectsByBId/${bId}`);
  }
  addSubject(subject: AddSubjectModel) {
   
    console.log('formData:S', subject);
    return this.http.post('https://localhost:7009/api/subjects/PostSubject', subject);
  }
}
